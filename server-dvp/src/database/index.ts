import { sequelize } from "../config/database";

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.error("DB connection error", error);
    }
};