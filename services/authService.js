import bcrypt from 'bcrypt';
const fs = await import('fs/promises');

import { generateToken } from '../utils/jwt.js';

const USERS_FILE = new URL('../data/users.json', import.meta.url);

export async function register(user) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(`Registering user: ${user.name} with hashed password: ${hashedPassword}`);
        // store in users.json file
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        const users = JSON.parse(data);
        users.push({ ...user, hashedPassword });
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        return { ...user, password: hashedPassword };
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
    const token = await generateToken(user);
    return token;
}
