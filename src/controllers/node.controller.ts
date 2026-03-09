import { Request, Response, NextFunction } from "express";
import {
  registerNode,
  heartbeatNode,
  getAvailableNodes
} from "../services/node.service";

export const registerNodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const userId = (req as any).userId;

    const node = await registerNode(userId, req.body);

    res.status(201).json({
      success: true,
      data: node
    });

  } catch (error) {
    next(error);
  }
};

export const heartbeatNodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { nodeId, availableGPUs, runningJobs } = req.body;

    const node = await heartbeatNode(
      nodeId,
      availableGPUs,
      runningJobs
    );

    res.json({
      success: true,
      data: node
    });

  } catch (error) {
    next(error);
  }
};

export const getAvailableNodesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const nodes = await getAvailableNodes();

    res.json({
      success: true,
      data: nodes
    });

  } catch (error) {
    next(error);
  }
};