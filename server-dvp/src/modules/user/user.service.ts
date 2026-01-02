import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import { User } from "./user.model";
import { badRequest, internalServerError } from "../../shared/errors/graphql-errors";


export const getAllUsers = async (): Promise<User[]> => {
    try {
        return await User.findAll();
    } catch (error) {
        throw internalServerError();
    }
};

export const createUser = async (email: string, password: string): Promise<User> => {
    try {
        if (!email || !password) {
            throw badRequest("Email and password are required");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: passwordHash });
        return newUser;
    } catch (error) {
        throw internalServerError();
    }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: { id: number; email: string } }> => {
  try {
    if (!email || !password) {
      throw badRequest("Email and password are required");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw badRequest("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw badRequest("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id_user },JWT_SECRET,{ expiresIn: "1d" });    

    return {
      token,
      user: {
        id: user.id_user,
        email: user.email,
      }
    };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw internalServerError();
  }
};
