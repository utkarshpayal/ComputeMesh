import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered",
      user
    });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.json(data);

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};