const mongoose = require("mongoose");
const dns = require("dns");

// Configure public DNS servers to resolve MongoDB Atlas SRV records reliably on Windows/ISPs
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("⚠️ Could not set custom DNS servers, using system default:", dnsErr.message);
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MongoDB Connection Error: MONGODB_URI is not set in environment variables.");
    return false;
  }

  // Safe URI extraction for logging (no credentials)
  const sanitizedUri = uri.replace(/:\/\/([^:]+):([^@]+)@/, "://***:***@");

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error (${sanitizedUri}):`);

    if (error.message && error.message.includes("bad auth")) {
      console.error("   Reason: Authentication failed. Verify database username and password in MongoDB Atlas (Database Access).");
    } else if (error.message && (error.message.includes("ECONNREFUSED") || error.message.includes("querySrv"))) {
      console.error("   Reason: DNS SRV lookup failed for the Atlas cluster hostname.");
    } else if (error.name === "MongooseServerSelectionError") {
      console.error("   Reason: Could not reach cluster servers. Verify that your IP address is whitelisted in MongoDB Atlas (Network Access -> Allow 0.0.0.0/0).");
    } else {
      console.error(`   Details: ${error.message}`);
    }

    return false;
  }
};

module.exports = connectDB;