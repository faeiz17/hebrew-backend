import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Resource, Database } from "@adminjs/mongoose"; // Correct import

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import storyRoutes from "./routes/storiesRoutes.js";

import Story from "./models/storyModel.js";
import Exercise from "./models/exerciseModel.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ✅ Wrap in an async function to use `await`
const startServer = async () => {
  try {
    await connectDB(); // Ensure MongoDB connects before starting the server
    console.log("✅ MongoDB Connected Successfully");

    // ✅ Register Mongoose Adapter for AdminJS
    AdminJS.registerAdapter({
      Resource,
      Database,
    });

    const adminJs = new AdminJS({
      resources: [Story, Exercise], // Pass models directly
      branding: {
        companyName: "My Hebrew Learning Admin",
        logo: false,
      },
    });

    const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
      adminJs,
      {
        authenticate: async (email, password) => {
          const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
          const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";

          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            return { email };
          }
          return null;
        },
        cookieName: "adminjs",
        cookiePassword: "session-secret",
      },
      null,
      {
        resave: false,
        saveUninitialized: true,
        secret: "session-secret",
      }
    );

    app.use("/admin", adminJsRouter);
    app.use("/api/users", userRoutes);
    app.use("/api/exercises", exerciseRoutes);
    app.use("/api/stories", storyRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}/admin`)
    );
  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
};

// ✅ Call the function to start the server
startServer();

export default app;
