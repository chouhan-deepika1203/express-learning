import { verifyToken } from "../utils/jwt.js";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }
    try {
        const decoded = verifyToken(token);
        console.log(`Received token: ${decoded}`);
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }

}
