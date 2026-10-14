const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided",
    });
  }

  let token;
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = authHeader;
  }

  if (!token || token.trim() === "") {
    return res.status(401).json({
      message: "Access Denied. Malformed Token",
    });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || "travelverse_jwt_secret_key_2026_k4tLxZHyGASjgSSn";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again",
      });
    }

    res.status(401).json({
      message: "Invalid Token. Authorization denied",
    });
  }
};

module.exports = protect;