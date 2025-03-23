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
} from "../controllers/userController.js";

const router = express.Router();

// 1) Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// 2) Basic CRUD
router.get("/", getAllUsers); // GET /api/users
router.get("/:id", getUserById); // GET /api/users/:id
router.put("/:id", updateUser); // PUT /api/users/:id
router.delete("/:id", deleteUser); // DELETE /api/users/:id

// 3) Progress & Tracking
router.post("/:id/completedStory", addCompletedStory); // POST /api/users/:id/completedStory
router.put("/:id/xp", updateXP); // PUT /api/users/:id/xp
router.put("/:id/highestUnlockedLevel", updateHighestUnlockedLevel); // PUT /api/users/:id/highestUnlockedLevel

export default router;
