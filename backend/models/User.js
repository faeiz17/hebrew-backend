// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "teacher", "student"], required: true },
// });

// // ✅ Use `export default` instead of `module.exports`
// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

    // If you want to implement email verification or password resets later:
    // isEmailVerified: { type: Boolean, default: false },
    // verifyToken: String,
    // verifyTokenExpires: Date,
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
  },
  {
    timestamps: true, // automatically creates `createdAt` and `updatedAt`
  }
);

export default mongoose.model("User", userSchema);
