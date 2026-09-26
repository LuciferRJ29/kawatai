// Vercel Serverless Function: GET /api/config
// Returns the currently active Heroku backend URL for the KAWAT Mobile App

// Global in-memory storage for current deployment lifecycle
let cachedBackendUrl = process.env.HEROKU_BACKEND_URL || "https://mobile-antigravity.herokuapp.com";

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const currentUrl = process.env.HEROKU_BACKEND_URL || cachedBackendUrl;

  // Optional: check if backend is reachable
  let backendHealth = "unknown";
  if (req.query.check_health === "true") {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const pingRes = await fetch(`${currentUrl.replace(/\/$/, "")}/api/status`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      backendHealth = pingRes.ok ? "online" : "error";
    } catch (err) {
      backendHealth = "offline";
    }
  }

  return res.status(200).json({
    status: "success",
    backend_url: currentUrl,
    health: backendHealth,
    gateway: "kawatai.vercel.app",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
};
