const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const user = await User.findOneAndUpdate(
      { email: "shraddha02@gmail.com" },
      {
        password: hashedPassword,
        role: "admin",
      },
      { new: true }
    );

    if (!user) {
      console.log("Admin user not found");
      process.exit(1);
    }

    console.log("Admin password reset successfully");
    console.log("Email: shraddha02@gmail.com");
    console.log("Password: Admin@123");

    await mongoose.connection.close();
  } catch (error) {
    console.log("RESET ERROR:", error);
    process.exit(1);
  }
};

resetPassword();