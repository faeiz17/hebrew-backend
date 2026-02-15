import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { IUser } from "../models/index.js";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// Extend Express Request type to include user
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends IUser { }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  // Development Bypass
  if (process.env.NODE_ENV === "development" && req.headers["x-dev-user-email"]) {
    const devUserEmail = req.headers["x-dev-user-email"] as string;
    const devUser = await User.findOne({ email: devUserEmail }).select("-password");
    if (devUser) {
      req.user = devUser as IUser;
      return next();
    }
  }

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const role = (requiredRole: string) => (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === requiredRole) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Access is denied" });
  }
};
