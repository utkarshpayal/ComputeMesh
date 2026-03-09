import Job from "../models/Job";
import Node from "../models/Node";
import { scheduleNode } from "./scheduler.service";

export const submitJob = async (userId: string, jobData: any) => {

  const node = await scheduleNode(jobData.requiredGPUs);

  const job = await Job.create({
    userId,
    dockerImage: jobData.dockerImage,
    command: jobData.command,
    requiredGPUs: jobData.requiredGPUs,
    requiredRAM: jobData.requiredRAM,
    requiredCPU: jobData.requiredCPU,
    status: "scheduled",
    assignedNodeId: node._id
  });

  await Node.findByIdAndUpdate(node._id, {
    $inc: {
      availableGPUs: -jobData.requiredGPUs,
      runningJobs: 1
    }
  });

  return job;
};