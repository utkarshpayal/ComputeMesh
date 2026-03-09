import { Schema, model, Document, Types } from "mongoose";

export type JobStatus =
  | "queued"
  | "scheduled"
  | "running"
  | "completed"
  | "failed";

export interface IJob extends Document {
  userId: Types.ObjectId;

  jobType: string;
  dockerImage: string;
  command: string;

  requiredGPUs: number;
  requiredRAM: number;
  requiredCPU: number;

  priority: number;

  status: JobStatus;

  assignedNodeId?: Types.ObjectId;

  queuedAt: Date;
  startedAt?: Date;
  finishedAt?: Date;

  outputLocation?: string;
  logs?: string;
}

const JobSchema = new Schema<IJob>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  jobType: String,

  dockerImage: String,

  command: String,

  requiredGPUs: Number,
  requiredRAM: Number,
  requiredCPU: Number,

  priority: {
    type: Number,
    default: 1
  },

  status: {
    type: String,
    enum: ["queued", "scheduled", "running", "completed", "failed"],
    default: "queued",
    index: true
  },

  assignedNodeId: {
    type: Schema.Types.ObjectId,
    ref: "Node"
  },

  queuedAt: {
    type: Date,
    default: Date.now
  },

  startedAt: Date,
  finishedAt: Date,

  outputLocation: String,
  logs: String
});

export default model<IJob>("Job", JobSchema);