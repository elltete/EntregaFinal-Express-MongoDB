import jwt from "jsonwebtoken";

process.loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    let token;
  
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
  
    if (!token) {
      return res.status(403).json({ error: "Forbidden" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid token." });
    }

  };

  export { auth }