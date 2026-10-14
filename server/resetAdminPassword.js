const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const dns = require("dns");
const User = require("./models/User");

// Public DNS servers for reliable Atlas SRV resolution
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // ignore
}

dotenv.config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const user = await User.findOneAndUpdate(
      { email: "shraddha02@gmail.com" },
      {
        name: "Admin Shraddha",
        email: "shraddha02@gmail.com",
        password: hashedPassword,
        role: "admin",
      },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    );

    console.log("Admin user saved/updated successfully!");
    console.log("Email: shraddha02@gmail.com");
    console.log("Password: Admin@123");
    console.log("Role: admin");

    await mongoose.connection.close();
  } catch (error) {
    console.log("RESET ERROR:", error);
    process.exit(1);
  }
};

resetPassword();