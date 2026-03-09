import { Request, Response, NextFunction } from "express";
import { submitJob } from "../services/job.service";

export const submitJobController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const userId = (req as any).userId;

    const job = await submitJob(userId, req.body);

    res.status(201).json({
      success: true,
      data: job
    });

  } catch (error) {
    next(error);
  }
};