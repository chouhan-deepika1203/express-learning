const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
];

export const getAllUsers = () => {
    return users;
};

export const getUserById = (id) => {
    return users.find(u => u.id === id);
};

export const createUser = (user) => {
    user.id = users.length + 1; // Simple ID assignment
    users.push(user);
    return user;
};

export const getUserCount = () => {
    return users.length;
};

export const updateUser = (id, updatedUser) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }
    return null;
};

export const deleteUser = (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        return deletedUser[0];
    }
    return null;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    getUserCount
};
