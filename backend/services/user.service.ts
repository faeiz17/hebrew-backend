import mongoose from "mongoose";
import { User, IUser, ICompletedStory } from "../models/index.js";
import bcrypt from "bcryptjs";

export class UserService {
    /**
     * Find user by email with optional password selection
     */
    async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
        const query = User.findOne({ email });
        if (includePassword) {
            query.select("+password");
        }
        return query.exec();
    }

    /**
     * Find user by ID
     */
    async findById(id: string): Promise<IUser | null> {
        return User.findById(id).select("-password").exec();
    }

    /**
     * Create a new user
     */
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password!, salt);

        return User.create({
            ...userData,
            password: hashedPassword,
        });
    }

    /**
     * Get all users
     */
    async getAllUsers(): Promise<IUser[]> {
        return User.find({}).select("-password").exec();
    }

    /**
     * Update user by ID
     */
    async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        return User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).select("-password").exec();
    }

    /**
     * Delete user by ID
     */
    async deleteUser(id: string): Promise<boolean> {
        const result = await User.findByIdAndDelete(id);
        return !!result;
    }

    /**
     * Add or update a completed story
     */
    async addCompletedStory(id: string, storyId: string, quizScore: number): Promise<IUser | null> {
        const user = await User.findById(id);
        if (!user) return null;

        const existingStory = user.completedStories.find(
            (cs: ICompletedStory) => cs.storyId.toString() === storyId
        );

        if (existingStory) {
            existingStory.quizScore = quizScore || existingStory.quizScore;
            existingStory.attempts += 1;
            existingStory.completedAt = new Date();
        } else {
            user.completedStories.push({
                storyId: new mongoose.Types.ObjectId(storyId),
                quizScore: quizScore || 0,
                attempts: 1,
                completedAt: new Date()
            });
        }

        return user.save();
    }

    /**
     * Update User XP
     */
    async updateXP(id: string, xpChange: number): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            id,
            { $inc: { xp: xpChange } },
            { new: true }
        ).exec();
    }

    /**
     * Update Highest Unlocked Level
     */
    async updateLevel(id: string, newLevel: number): Promise<IUser | null> {
        const user = await User.findById(id);
        if (!user) return null;

        if (newLevel > user.highestUnlockedLevel) {
            user.highestUnlockedLevel = newLevel;
            return user.save();
        }
        return user;
    }
}

export const userService = new UserService();
