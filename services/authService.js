import bcrypt from 'bcrypt';
const fs = await import('fs/promises');

import { generateToken } from '../utils/jwt.js';
import { createUser } from './userService.js';

const USERS_FILE = new URL('../data/users.json', import.meta.url);

export async function register(user) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await createUser({ ...user, hashedPassword });
        return { ...newUser, password: hashedPassword };
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Error registering user");
    }
}

async function findUserByEmail(email) {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(data);
    return users.find(user => user.email === email);
}

export async function loginUser(user) {
    const foundUser = await findUserByEmail(user.email);
    if (!foundUser) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(user.password, foundUser.hashedPassword || '');
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = await generateToken(foundUser);
    return token;
}
