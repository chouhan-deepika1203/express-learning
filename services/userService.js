const fs = await import('fs/promises');
const USERS_FILE = new URL('../data/users.json', import.meta.url);

export const getUsersFromFile = async () => {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users from file:", error);
        return [];
    }
};

const saveUsersToFile = async (users) => {
    try {
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing users to file:", error);
    }
};


export const getAllUsers = async () => {
    let users = await getUsersFromFile();
    return users;
};

export async function getUserById(id) {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(data);
    const user = users.find(u => u.id === id);
    const { password, hashedPassword, ...userWithoutPassword } = user; // Exclude password from the response
    return userWithoutPassword;
};

export const createUser = async (user) => {
    let users = await getUsersFromFile();
    user.id = users.length + 1; // Simple ID assignment
    users.push(user);
    await saveUsersToFile(users);
    return user;
};

export const getUserCount = async () => {
    const users = await getUsersFromFile();
    return users.length;
};

export const updateUser = async (id, updatedUser) => {
    let users = await getUsersFromFile();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        await saveUsersToFile(users);
        return users[index];
    }
    return null;
};

export const deleteUser = async (id) => {
    let users = await getUsersFromFile();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        await saveUsersToFile(users);
        return deletedUser[0];
    }
    return null;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    getUserCount,
    updateUser,
    deleteUser
};
