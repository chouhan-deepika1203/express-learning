import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key in production

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};
