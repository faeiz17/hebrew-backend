import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addCompletedStory,
  updateXP,
  updateHighestUnlockedLevel,
  getMe,
  updateMe,
} from "../controllers/user.controller.js";
import { protect, role } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 1) Auth - Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// 2) Protected Profile Routes
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

// 3) Protected Admin/User Routes
router.use(protect);

router.get("/", role("admin"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", role("admin"), deleteUser);

// 3) Progress & Tracking - Protected
router.post("/:id/completedStory", addCompletedStory);
router.put("/:id/xp", updateXP);
router.put("/:id/highestUnlockedLevel", updateHighestUnlockedLevel);

export default router;
