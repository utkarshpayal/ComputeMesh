import Node from "../models/Node";
import Provider from "../models/Provider";
import { Types } from "mongoose";
import crypto from "crypto";
import ApiError from "../utils/ApiError";

export const registerNode = async (
  userId: string,
  nodeData: any
) => {

  const provider = await Provider.findOne({ userId });

  if (!provider) {
    throw new ApiError(403, "User is not a provider");
  }

  const nodeId = crypto.randomUUID();

  const node = await Node.create({
    nodeId,
    providerId: provider._id,
    hostname: nodeData.hostname,
    publicIp: nodeData.publicIp,

    gpuModel: nodeData.gpuModel,
    gpuCount: nodeData.gpuCount,
    availableGPUs: nodeData.gpuCount,
    vramGB: nodeData.vramGB,

    cpuCores: nodeData.cpuCores,
    ramGB: nodeData.ramGB,
    diskGB: nodeData.diskGB,

    pricePerHour: nodeData.pricePerHour,

    status: "offline",
    runningJobs: 0
  });

  return node;
};

export const heartbeatNode = async (
  nodeId: string,
  availableGPUs: number,
  runningJobs: number
) => {

  const node = await Node.findOneAndUpdate(
    { nodeId },
    {
      status: "online",
      availableGPUs,
      runningJobs,
      lastHeartbeat: new Date()
    },
    { new: true }
  );

  if (!node) {
    throw new ApiError(404, "Node not found");
  }

  return node;
};

export const getAvailableNodes = async () => {

  const nodes = await Node.find({
    status: "online",
    availableGPUs: { $gt: 0 }
  }).select(
    "nodeId gpuModel availableGPUs pricePerHour publicIp"
  );

  return nodes;
};