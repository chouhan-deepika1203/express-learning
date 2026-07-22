import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key in production

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
