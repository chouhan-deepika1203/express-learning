import bcrypt from 'bcrypt';

export async function register(user) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(`Registering user: ${user.name} with hashed password: ${hashedPassword}`);
        return { ...user, password: hashedPassword };
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Error registering user");
    }
}
