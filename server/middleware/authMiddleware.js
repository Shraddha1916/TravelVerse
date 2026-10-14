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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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