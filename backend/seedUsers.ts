import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

const DEFAULT_PASSWORD = "Password123!";

async function seedUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("✅ Connected to MongoDB for user seeding...");

        // Clear existing users
        await User.deleteMany({});
        console.log("🧹 Cleared existing users.");

        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
        const users = [];

        // Role distribution: 2 admins, 4 teachers, 14 students
        for (let i = 1; i <= 20; i++) {
            let role: "admin" | "teacher" | "student" = "student";
            if (i <= 2) role = "admin";
            else if (i <= 6) role = "teacher";

            users.push({
                name: `${role.charAt(0).toUpperCase() + role.slice(1)} User ${i}`,
                email: `${role}${i}@example.com`,
                password: hashedPassword,
                role: role,
                xp: Math.floor(Math.random() * 1000),
                highestUnlockedLevel: Math.floor(Math.random() * 3),
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}${i}`,
                bio: `I am a ${role} in the Hebrew Learning Platform.`,
                preferences: {
                    isDarkMode: false,
                    notifications: {
                        email: true,
                        push: true,
                    },
                },
            });
        }

        await User.insertMany(users);
        console.log("✅ 20 users successfully seeded!");

    } catch (error) {
        console.error("❌ Error seeding users:", (error as Error).message);
    } finally {
        await mongoose.connection.close();
        console.log("🔒 Database connection closed.");
    }
}

seedUsers();
