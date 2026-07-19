import { register as registerUser, loginUser } from '../services/authService.js';
import { validateAuthInput } from '../utils/authValidation.js';

async function register(req, res) {
    try {
        const validationError = validateAuthInput(req.body, { requireName: true });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
}

async function login(req, res) {
    try {
        const validationError = validateAuthInput(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const token = await loginUser(req.body);
        // For demonstration, we will just return a success message.
        // In a real application, you would verify the user's credentials and generate a JWT token.
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user" });
    }
}

export { register, login };
