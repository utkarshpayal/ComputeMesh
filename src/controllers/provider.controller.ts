import { Request, Response, NextFunction } from "express";
import { registerProvider } from "../services/provider.service";
import Provider from "../models/Provider";

export const createProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).userId;

    const { providerName, location, publicIp } = req.body;

    const provider = await registerProvider(
      userId,
      providerName,
      location,
      publicIp,
    );

    res.status(201).json(provider);
  } catch (error: any) {
    next(error);
  }
};
export const getMyProvider = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const provider = await Provider.findOne({ userId });

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
