const nodemailer = require("nodemailer");

const SMTP_TIMEOUT_MS = 8000;

function stripQuotes(value) {
	return String(value || "").trim().replace(/^['"]+|['"]+$/g, "");
}

function smtpPassword() {
	return stripQuotes(process.env.SMTP_APP_PASS || process.env.SMTP_PASS);
}

function isPlaceholder(value) {
	const v = String(value || "").trim();
	return !v || /^(YOUR_|CHANGE_ME)/i.test(v) || /YOUR_SMTP|YOUR_MAILBOX|YOUR_DOMAIN/i.test(v);
}

function isSmtpConfigured() {
	return Boolean(
		stripQuotes(process.env.SMTP_HOST) &&
			!isPlaceholder(process.env.SMTP_HOST) &&
			stripQuotes(process.env.SMTP_USER) &&
			!isPlaceholder(process.env.SMTP_USER) &&
			smtpPassword() &&
			!isPlaceholder(smtpPassword())
	);
}

function isConnectFailure(error) {
	const code = String((error && error.code) || "");
	return ["ETIMEDOUT", "ESOCKET", "ECONNECTION", "ECONNREFUSED", "ECONNRESET", "ETLS", "EPROTO", "EDNS", "ENOTFOUND"].includes(code);
}

/**
 * Local PCs can use 465/587. GoDaddy Node often blocks those ports.
 * Workspace also accepts 80/3535; hosting relay is port 25 without login.
 */
function smtpHops() {
	const host = stripQuotes(process.env.SMTP_HOST) || "smtpout.secureserver.net";
	const hops = [];
	const add = (hop) => {
		if (!hops.some((existing) => existing.host === hop.host && existing.port === hop.port)) {
			hops.push(hop);
		}
	};
	const preferred = Number(stripQuotes(process.env.SMTP_PORT) || 465);
	add({ host, port: preferred, secure: preferred === 465, requireTLS: preferred === 587 });
	add({ host, port: 465, secure: true });
	add({ host, port: 587, requireTLS: true });
	add({ host, port: 80, requireTLS: true });
	add({ host, port: 3535, requireTLS: true });
	add({ host, port: 25 });
	add({ host: "relay-hosting.secureserver.net", port: 25, auth: false });
	if (String(process.env.NODE_ENV || "").toLowerCase() === "production") {
		add({ host: "localhost", port: 25, auth: false, timeoutMs: 4000 });
	}
	return hops;
}

function smtpTransportOptions(hop) {
	const timeout = hop.timeoutMs || SMTP_TIMEOUT_MS;
	const options = {
		host: hop.host,
		port: hop.port,
		family: 4,
		connectionTimeout: timeout,
		greetingTimeout: timeout,
		socketTimeout: timeout
	};
	if (hop.host !== "localhost") {
		options.tls = { minVersion: "TLSv1.2", servername: hop.host };
	}
	if (hop.secure) options.secure = true;
	if (hop.requireTLS) options.requireTLS = true;
	if (hop.auth === false) options.ignoreTLS = true;
	if (hop.auth !== false) {
		options.auth = {
			user: stripQuotes(process.env.SMTP_USER),
			pass: smtpPassword()
		};
	}
	return options;
}

function mailFrom() {
	const user = stripQuotes(process.env.SMTP_USER);
	const from = stripQuotes(process.env.SMTP_FROM);
	if (!from) return user;
	if (from.toLowerCase().includes(user.toLowerCase())) return from;
	return user;
}

function describeMailError(error) {
	const err = error || {};
	if (err.responseCode === 550 || err.responseCode === 553) {
		return "SMTP relay denied (550/553). Use smtpout.secureserver.net with mailbox login.";
	}
	if (err.code === "EAUTH" || err.responseCode === 535) {
		return "SMTP 535: login rejected. Use smtpout.secureserver.net. If 2FA is on, set SMTP_APP_PASS to an app password.";
	}
	if (err.code === "ETIMEDOUT" || err.code === "ESOCKET" || err.code === "ECONNECTION" || err.code === "ECONNREFUSED") {
		return "Outbound SMTP was blocked or timed out. The app also tried ports 80, 3535, 25 and relay-hosting.secureserver.net.";
	}
	if (err.code === "EDNS" || err.code === "ENOTFOUND") {
		return "SMTP host could not be resolved. SMTP_HOST must be smtpout.secureserver.net.";
	}
	const detail = error instanceof Error ? error.message : "";
	return detail ? `Could not send email: ${detail}` : "Could not send email";
}

function escapeHtml(value) {
	return String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function contactEmailTemplate({ name, email, subject, message }) {
	const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
	const html = `
		<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:12px">
			<h2 style="margin-top:0">OBERP website enquiry</h2>
			<p><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(email)}</p>
			<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
			<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
		</div>
	`;
	return { text, html };
}

async function sendMail(to, subject, { text, html, replyTo } = {}) {
	if (!isSmtpConfigured()) {
		throw new Error(
			"SMTP is not configured. Set SMTP_HOST=smtpout.secureserver.net, SMTP_PORT=465, SMTP_USER, and SMTP_PASS."
		);
	}

	const hops = smtpHops();
	let lastError;

	for (const hop of hops) {
		const transporter = nodemailer.createTransport(smtpTransportOptions(hop));
		try {
			const info = await transporter.sendMail({
				from: mailFrom(),
				to,
				replyTo,
				subject,
				text,
				html,
				envelope: {
					from: stripQuotes(process.env.SMTP_USER),
					to
				}
			});
			if (info.rejected && info.rejected.length) {
				throw new Error(`Mail server rejected recipient: ${info.rejected.join(", ")}`);
			}
			console.log("[mail] accepted", {
				to,
				host: hop.host,
				port: hop.port,
				messageId: info.messageId,
				response: info.response
			});
			return info;
		} catch (error) {
			lastError = error;
			console.warn("[mail] hop failed", {
				host: hop.host,
				port: hop.port,
				auth: hop.auth !== false,
				code: error.code,
				responseCode: error.responseCode,
				response: error.response
			});
			if (!isConnectFailure(error)) {
				throw new Error(describeMailError(error));
			}
		}
	}

	throw new Error(describeMailError(lastError));
}

module.exports = {
	isSmtpConfigured,
	sendMail,
	contactEmailTemplate,
	stripQuotes
};
