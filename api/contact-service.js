import nodemailer from "nodemailer";

const recipientEmail = process.env.CONTACT_TO_EMAIL || "othmanemoumni5@gmail.com";
const rateLimitWindowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const rateLimitMaxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
const allowedOrigins = new Set(
  String(process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);
const rateLimitStore = new Map();

const FIELD_LIMITS = {
  name: 80,
  email: 254,
  projectType: 80,
  message: 5000,
};

export async function handleContactRequest(req, res) {
  if (req.method !== "POST") {
    setHeader(res, "Allow", "POST");
    return sendJson(res, 405, { message: "Method not allowed." });
  }

  if (!isJsonRequest(req)) {
    return sendJson(res, 415, { message: "Content-Type must be application/json." });
  }

  if (!isAllowedOrigin(req)) {
    return sendJson(res, 403, { message: "Origin not allowed." });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return sendJson(res, 429, { message: "Too many requests. Please try again later." });
  }

  const validation = validatePayload(req.body || {});

  if (!validation.ok) {
    return sendJson(res, 400, { message: validation.message });
  }

  if (validation.isSpam) {
    return sendJson(res, 200, { ok: true });
  }

  const transporter = getTransporter();

  if (!transporter) {
    return sendJson(res, 500, { message: "Email service is not configured." });
  }

  const { name, email, projectType, message } = validation.data;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME}>`,
      to: recipientEmail,
      replyTo: email,
      subject: buildSubject(projectType),
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

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return sendJson(res, 500, { message: "Message could not be sent." });
  }
}

function validatePayload(payload) {
  const name = normalizeLine(payload.name);
  const email = normalizeLine(payload.email).toLowerCase();
  const projectType = normalizeLine(payload.projectType);
  const message = normalizeMultiline(payload.message);
  const company = normalizeLine(payload.company);

  if (company) {
    return { ok: true, isSpam: true };
  }

  if (!name || !email || !message) {
    return { ok: false, message: "Name, email, and message are required." };
  }

  if (!isValidLength(name, FIELD_LIMITS.name)) {
    return { ok: false, message: `Name must be ${FIELD_LIMITS.name} characters or fewer.` };
  }

  if (!isValidLength(email, FIELD_LIMITS.email) || !isValidEmail(email)) {
    return { ok: false, message: "A valid email address is required." };
  }

  if (projectType && !isValidLength(projectType, FIELD_LIMITS.projectType)) {
    return { ok: false, message: `Project type must be ${FIELD_LIMITS.projectType} characters or fewer.` };
  }

  if (!isValidLength(message, FIELD_LIMITS.message)) {
    return { ok: false, message: `Message must be ${FIELD_LIMITS.message} characters or fewer.` };
  }

  return {
    ok: true,
    isSpam: false,
    data: { name, email, projectType, message },
  };
}

function buildSubject(projectType) {
  return `New portfolio message: ${projectType || "General inquiry"}`;
}

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

function isJsonRequest(req) {
  const contentType = req.headers?.["content-type"];

  if (!contentType) {
    return true;
  }

  return String(contentType).toLowerCase().startsWith("application/json");
}

function isAllowedOrigin(req) {
  if (allowedOrigins.size === 0) {
    return true;
  }

  const origin = normalizeLine(req.headers?.origin);

  if (!origin) {
    return false;
  }

  return allowedOrigins.has(origin);
}

function isRateLimited(clientIp) {
  const now = Date.now();

  for (const [key, timestamps] of rateLimitStore.entries()) {
    const recent = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);

    if (recent.length === 0) {
      rateLimitStore.delete(key);
      continue;
    }

    rateLimitStore.set(key, recent);
  }

  const timestamps = rateLimitStore.get(clientIp) || [];
  const recent = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);

  if (recent.length >= rateLimitMaxRequests) {
    rateLimitStore.set(clientIp, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(clientIp, recent);
  return false;
}

function getClientIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }

  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return String(forwarded[0]).trim();
  }

  return (
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown"
  );
}

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function setHeader(res, name, value) {
  if (typeof res.setHeader === "function") {
    res.setHeader(name, value);
    return;
  }

  if (typeof res.set === "function") {
    res.set(name, value);
  }
}

function normalizeLine(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMultiline(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function isValidLength(value, max) {
  return value.length <= max;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
