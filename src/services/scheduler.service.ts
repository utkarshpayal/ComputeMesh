import Node from "../models/Node";
import ApiError from "../utils/ApiError";

export const scheduleNode = async (requiredGPUs: number) => {

  const node = await Node.findOne({
    status: "online",
    availableGPUs: { $gte: requiredGPUs }
  }).sort({ pricePerHour: 1 });

  if (!node) {
    throw new ApiError(404, "No available nodes");
  }

  return node;
};