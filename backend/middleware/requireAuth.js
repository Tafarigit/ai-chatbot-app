const jwt = require("jsonwebtoken");

//secret key f- fro local dev you can store in .env
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({errir: "Unauthorized: missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    }catch (err) {
        return res.status(401).json({ error: "Unauthorized: invalid token" });
    }
};

module.exports = requireAuth;
