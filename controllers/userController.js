import * as userService from '../services/userService.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        if (!newUser.name || !newUser.age) {
            return res.status(400).json({ message: "Name and age are required" });
        }
        //name must be 3 characters long
        if (newUser.name.length < 3) {
            return res.status(400).json({ message: "Name must be at least 3 characters long" });
        }
        //age must be a number between 1 and 120
        if (typeof newUser.age !== 'number' || newUser.age < 1 || newUser.age > 120) {
            return res.status(400).json({ message: "Age must be a number between 1 and 120" });
        }
        const createdUser = await userService.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedUserData = req.body;
        const updatedUser = await userService.updateUser(userId, updatedUserData);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const deletedUser = await userService.deleteUser(userId);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};