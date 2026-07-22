import jwt from 'jsonwebtoken';
import "dotenv/config";

const SECRET_KEY = process.env.JWT_SECRET; // Use environment variable for secret key

export const generateToken = (payload) => {
    return jwt.sign({ id: payload.id, email: payload.email, role: payload.role }, SECRET_KEY, { expiresIn: '1h' });
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Invalid token');
    }
};
