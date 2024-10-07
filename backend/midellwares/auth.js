const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  // Check if the token is provided
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Split the header to get the token

  const secretJwt = "hello"; // Ideally, move this to an environment variable

  try {
    // Verify the token
    const decoded = await jwt.verify(token, secretJwt);
    
    // Attach the user ID to the request object
    req.user_id = decoded.id;
 req.user_role = decoded.role;
    
    // Proceed to the next middleware
    next();
  } catch (err) {
    // Handle token verification errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  auth
};
