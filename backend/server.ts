import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";
import storyRoutes from "./routes/story.routes.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app: Application = express();

// Disable the 'X-Powered-By' header for security
app.disable("x-powered-by");

// Connect to MongoDB
connectDB();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Health Check
app.get("/", (req, res) => {
    res.json({ message: "Hebrew Learning Platform API is running! 🚀" });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/stories", storyRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `✅ Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
    );
});

export default app;
