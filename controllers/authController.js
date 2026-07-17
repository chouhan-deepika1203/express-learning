import { register as registerUser } from '../services/authService.js';
//fix below code to use registerUser instead of register to avoid naming conflict

async function register(req, res) {
    try {
        // name, email and password are required
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        // email must be valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // password must be at least 8 characters long
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const user = await registerUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
}

export { register };
