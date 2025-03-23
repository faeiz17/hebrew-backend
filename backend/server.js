import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import storyRoutes from "./routes/storiesRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Disable the 'X-Powered-By' header for a bit more security
app.disable("x-powered-by");

// Connect to MongoDB
connectDB();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from any origin
// (If you want to allow only certain domains, replace "*" with an array of domains.)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/stories", storyRoutes);

console.log("git changes");

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
