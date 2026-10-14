const mongoose = require("mongoose");
const dns = require("dns");

// Configure public DNS servers to resolve MongoDB Atlas SRV records reliably on Windows/ISPs
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("⚠️ Could not set custom DNS servers, using system default:", dnsErr.message);
}

let lastDbError = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    lastDbError = "MONGODB_URI is not set in environment variables.";
    console.error("❌ MongoDB Connection Error:", lastDbError);
    return false;
  }

  // Safe URI extraction for logging (no credentials)
  const sanitizedUri = uri.replace(/:\/\/([^:]+):([^@]+)@/, "://***:***@");

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    lastDbError = null;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    lastDbError = error.message;
    console.error(`❌ MongoDB Connection Error (${sanitizedUri}):`, error.message);
    return false;
  }
};

// Retry connecting automatically every 15 seconds if disconnected
setInterval(async () => {
  if (mongoose.connection.readyState === 0 && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("✅ MongoDB Auto-Reconnected Successfully!");
    } catch (e) {
      // Keep retrying quietly
    }
  }
}, 15000);

module.exports = {
  connectDB,
  getLastDbError: () => lastDbError,
};