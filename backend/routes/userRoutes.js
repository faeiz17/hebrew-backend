import express from "express";
import passport from "passport";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";
import { protect, role } from "../middlewares/authMiddleware.js";
import { generateToken } from "../utils/generateToken.js"; // Ensure generateToken.js exists and uses export

const router = express.Router();

// Traditional auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, role("admin"), getAllUsers);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Send JWT or redirect to the frontend with user details
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      token: generateToken(req.user.id),
    });
  }
);

// ✅ Use `export default` instead of `module.exports`
export default router;
