require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(ROOT));

const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
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

function createTransport() {
	return nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 465),
		secure: String(process.env.SMTP_PORT || 465) === "465",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	});
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

	if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
		return res.status(500).json({ ok: false, message: "Mail server is not configured yet." });
	}

	const to = process.env.SUPPORT_EMAIL || process.env.SMTP_USER;
	const from = process.env.SMTP_FROM || process.env.SMTP_USER;

	try {
		const transporter = createTransport();
		await transporter.sendMail({
			from,
			to,
			replyTo: email,
			subject: `OBERP website enquiry: ${subject}`,
			text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
		});
		return res.json({ ok: true, message: "Message sent." });
	} catch (error) {
		console.error("Contact mail failed:", error.message);
		return res.status(500).json({ ok: false, message: "We could not send your message. Please try again or email us directly." });
	}
});

app.get("*", (req, res, next) => {
	if (req.path.startsWith("/api/")) {
		return next();
	}
	if (path.extname(req.path)) {
		return res.status(404).sendFile(path.join(ROOT, "404.html"));
	}
	return res.status(404).sendFile(path.join(ROOT, "404.html"));
});

app.listen(PORT, () => {
	console.log(`OBERP site running at http://localhost:${PORT}`);
});
