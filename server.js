import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3001);
const recipientEmail = process.env.CONTACT_TO_EMAIL || "othmanemoumni5@gmail.com";

app.use(express.json({ limit: "20kb" }));

function getTransporter() {
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT || 465),
    secure: process.env.MAIL_SECURE !== "false",
    auth: { user, pass },
  });
}

app.post("/api/contact", async (req, res) => {
  const { name, email, projectType, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const transporter = getTransporter();

  if (!transporter) {
    return res.status(500).json({ message: "Email service is not configured." });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New portfolio message: ${projectType || "General inquiry"}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType || "Not specified"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType || "Not specified")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(500).json({ message: "Message could not be sent." });
  }
});

const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Contact server running on http://localhost:${port}`);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
