import bcrypt from "bcryptjs";
import { User } from "./user.model";


export const getAllUsers = async (): Promise<User[]> => {
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error("Failed to retrieve users");
    }
};

export const createUser = async (email: string, password: string): Promise<User> => {
    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: passwordHash });
        return newUser;
    } catch (error) {
        throw new Error("Failed to create user");
    }
};
