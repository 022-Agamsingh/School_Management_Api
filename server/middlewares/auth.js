import jwt from 'jsonwebtoken';
import User from '../src/models/user.js';

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = decoded;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

export { userAuth };