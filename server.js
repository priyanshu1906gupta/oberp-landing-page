require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { isSmtpConfigured, sendMail, contactEmailTemplate, stripQuotes } = require("./lib/mailer");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(ROOT));

const contactLimiter = rateLimit({
	windowMs: Number(process.env.CONTACT_RATE_WINDOW_MS || 15 * 60 * 1000),
	max: Number(process.env.CONTACT_RATE_MAX || 20),
	skipFailedRequests: true,
	standardHeaders: true,
	legacyHeaders: false,
	message: { ok: false, message: "Too many contact attempts. Please try again later." }
});

function clean(value) {
	return String(value || "").trim();
}

function isEmail(value) {
	return /^([\w.-]+@([\w-]+\.)+[\w-]{2,})$/.test(value);
}

app.post("/api/contact", contactLimiter, async (req, res) => {
	const name = clean(req.body.name);
	const email = clean(req.body.email);
	const subject = clean(req.body.subject);
	const message = clean(req.body.message);

	if (name.length < 2 || name.length > 80) {
		return res.status(400).json({ ok: false, message: "Please enter your name." });
	}
	if (!isEmail(email)) {
		return res.status(400).json({ ok: false, message: "Please enter a valid email." });
	}
	if (subject.length < 3 || subject.length > 120) {
		return res.status(400).json({ ok: false, message: "Please enter a subject." });
	}
	if (message.length < 10 || message.length > 2000) {
		return res.status(400).json({ ok: false, message: "Please enter a message of at least 10 characters." });
	}

	if (!isSmtpConfigured()) {
		return res.status(500).json({
			ok: false,
			message: "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS on the server."
		});
	}

	const to = stripQuotes(process.env.SUPPORT_EMAIL || process.env.SMTP_USER);
	const mail = contactEmailTemplate({ name, email, subject, message });

	try {
		await sendMail(to, `OBERP website enquiry: ${subject}`, {
			text: mail.text,
			html: mail.html,
			replyTo: email
		});
		return res.json({ ok: true, message: "Message sent." });
	} catch (error) {
		console.error("Contact mail failed:", error.message);
		return res.status(500).json({
			ok: false,
			message: error.message || "We could not send your message. Please try again or email us directly."
		});
	}
});

app.get("*", (req, res, next) => {
	if (req.path.startsWith("/api/")) {
		return next();
	}
	return res.status(404).sendFile(path.join(ROOT, "404.html"));
});

app.listen(PORT, () => {
	console.log(`OBERP site running at http://localhost:${PORT}`);
	if (isSmtpConfigured()) {
		console.log(`SMTP: ${stripQuotes(process.env.SMTP_USER)} via ${stripQuotes(process.env.SMTP_HOST)}:${stripQuotes(process.env.SMTP_PORT || "465")}`);
	} else {
		console.warn("SMTP: not configured (set SMTP_HOST, SMTP_USER, and SMTP_PASS)");
	}
});
