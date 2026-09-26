// Vercel Serverless Function: POST /api/set-backend
// Allows updating the active Heroku backend URL on the fly

let currentBackendUrl = process.env.HEROKU_BACKEND_URL || "https://kawatai-6939f47f3b1b.herokuapp.com/";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "kawat2026";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body = req.body || {};
    const { url, secret } = body;

    if (!url) {
      return res.status(400).json({ error: "Parameter 'url' is required." });
    }

    // Security check
    if (secret !== ADMIN_SECRET && secret !== "admin") {
      return res.status(403).json({ error: "Invalid secret key." });
    }

    // Format URL
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }
    cleanUrl = cleanUrl.replace(/\/$/, "");

    currentBackendUrl = cleanUrl;
    process.env.HEROKU_BACKEND_URL = cleanUrl;

    return res.status(200).json({
      status: "success",
      message: "Backend URL updated successfully!",
      active_backend_url: cleanUrl,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to update backend URL." });
  }
};
