import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * Register a new user.
 *  - Hashes the password with bcrypt.
 *  - Returns basic user info (without password).
 */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Login a user.
 *  - Finds user by email.
 *  - Compares password with bcrypt.
 *  - Returns user info if valid, or 401 if invalid.
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // We use .select("+password") because our model has select: false for password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If valid, remove the password from the user object
    user.password = undefined;

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all users.
 *  - Omits the password field.
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single user by ID.
 *  - Omits the password field.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a user by ID.
 *  - Allows updating name, email, password, avatarUrl, bio, preferences, etc.
 *  - If password is provided, re-hash it.
 */
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, avatarUrl, bio, preferences } = req.body;

    // Prepare fields to update
    const updatedFields = {
      name,
      email,
      avatarUrl,
      bio,
      preferences,
    };

    // If password is provided, hash it again
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    // Find and update
    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true, // return the updated doc
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a user by ID.
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add or update a completed story for the user.
 *  - storyId, quizScore from req.body
 *  - If the story already exists, update it. Otherwise, push a new record.
 */
export const addCompletedStory = async (req, res) => {
  const { storyId, quizScore } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingStory = user.completedStories.find(
      (cs) => cs.storyId.toString() === storyId
    );

    if (existingStory) {
      // Update existing record
      existingStory.quizScore = quizScore || existingStory.quizScore;
      existingStory.attempts += 1;
      existingStory.completedAt = new Date();
    } else {
      // Add new record
      user.completedStories.push({
        storyId,
        quizScore: quizScore || 0,
        attempts: 1,
      });
    }

    await user.save();

    res.status(200).json({
      message: "Story completion recorded",
      completedStories: user.completedStories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update XP for a user (increment or decrement).
 *  - xpChange from req.body (e.g. +10, -5, etc.)
 */
export const updateXP = async (req, res) => {
  const { xpChange } = req.body; // e.g. { xpChange: 10 }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.xp += xpChange;
    await user.save();

    res.status(200).json({
      message: "User XP updated",
      xp: user.xp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update highestUnlockedLevel for a user.
 *  - newLevel from req.body
 *  - Only set it if the newLevel is greater than the current value
 */
export const updateHighestUnlockedLevel = async (req, res) => {
  const { newLevel } = req.body; // e.g. { newLevel: 5 }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newLevel > user.highestUnlockedLevel) {
      user.highestUnlockedLevel = newLevel;
      await user.save();
    }

    res.status(200).json({
      message: "highestUnlockedLevel updated",
      highestUnlockedLevel: user.highestUnlockedLevel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
