import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICompletedStory {
  storyId: mongoose.Types.ObjectId;
  completedAt: Date;
  quizScore: number;
  attempts: number;
}

export interface IPreferences {
  isDarkMode: boolean;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "teacher" | "student";
  avatarUrl: string;
  bio: string;
  xp: number;
  highestUnlockedLevel: number;
  completedStories: ICompletedStory[];
  dailyStreak: number;
  lastLogin: Date | null;
  achievements: { type: string }[];
  preferences: IPreferences;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    // Basic Profile & Auth
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude from queries by default
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },

    // Profile Extras
    avatarUrl: {
      type: String,
      default: "",
    },
    // e.g., short bio or tagline
    bio: {
      type: String,
      default: "",
    },

    // Progress Tracking
    xp: {
      type: Number,
      default: 0,
    },
    highestUnlockedLevel: {
      type: Number,
      default: 0, // e.g., 0 => only Level 1 is unlocked
    },

    // Completed Stories
    // Track each story the user has completed, plus optional details
    completedStories: [
      {
        storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
        completedAt: { type: Date, default: Date.now },
        quizScore: { type: Number, default: 0 },
        attempts: { type: Number, default: 1 }, // how many times they tried
        // Add any other metrics you want to track per story
      },
    ],

    // Daily usage or gamification
    dailyStreak: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    // Achievements
    // Could store an array of strings or references to an "Achievement" model
    achievements: [
      {
        type: String, // e.g., "Completed First Story", "Scored 100% on Hard"
      },
    ],

    // UI / Preferences
    preferences: {
      isDarkMode: { type: Boolean, default: false },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
      // add more user-specific preferences here
    },
  },
  {
    timestamps: true, // automatically creates `createdAt` and `updatedAt`
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
