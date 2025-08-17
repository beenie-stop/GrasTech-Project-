
import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header received (backend):", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

 
  const token = authHeader.split(" ")[1];
  console.log("Incoming token (backend):", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token (backend):", decoded);

    
    req.user = { id: decoded.userId, email: decoded.email };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
