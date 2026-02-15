import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userService } from "../services/user.service.js";
import { generateToken } from "../utils/auth.utils.js";
import { IUser } from "../models/index.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await userService.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userService.createUser({ name, email, password, role });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: (user as IUser)._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken((user as IUser)._id.toString()),
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Login user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findByEmail(email, true);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: (user as IUser)._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken((user as IUser)._id.toString()),
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/users/me
 * @access  Private
 */
export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Update current user profile
 * @route   PUT /api/users/me
 * @access  Private
 */
export const updateMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    const updatedUser = await userService.updateUser((req.user as IUser)._id.toString(), req.body as Partial<IUser>);
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(req.params.id as string);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id as string, req.body as Partial<IUser>);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const success = await userService.deleteUser(req.params.id as string);
    if (!success) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Add completed story
 * @route   POST /api/users/:id/completedStory
 * @access  Private
 */
export const addCompletedStory = async (req: Request, res: Response) => {
  const { storyId, quizScore } = req.body;
  try {
    const user = await userService.addCompletedStory(req.params.id as string, storyId as string, quizScore as number);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Story completion recorded", completedStories: user.completedStories });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Update XP
 * @route   PUT /api/users/:id/xp
 * @access  Private
 */
export const updateXP = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateXP(req.params.id as string, req.body.xpChange as number);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User XP updated", xp: user.xp });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Update level progression
 * @route   PUT /api/users/:id/highestUnlockedLevel
 * @access  Private
 */
export const updateHighestUnlockedLevel = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateLevel(req.params.id as string, Number(req.body.newLevel));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "highestUnlockedLevel updated",
      highestUnlockedLevel: user.highestUnlockedLevel,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
