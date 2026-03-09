import { Schema, model, Document, Types } from "mongoose";

export type NodeStatus = "online" | "offline" | "busy" | "maintenance";

export interface INode extends Document {
  nodeId: string;
  providerId: Types.ObjectId;
  hostname: string;
  publicIp: string;

  gpuModel: string;
  gpuCount: number;
  availableGPUs: number;
  vramGB: number;

  cpuCores: number;
  ramGB: number;
  diskGB: number;

  status: NodeStatus;

  pricePerHour: number;

  runningJobs: number;

  lastHeartbeat: Date;
  uptimePercentage: number;

  createdAt: Date;
}

const NodeSchema = new Schema<INode>(
  {
    nodeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    providerId: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
      index: true,
    },

    hostname: String,
    publicIp: String,

    gpuModel: String,
    gpuCount: Number,
    availableGPUs: Number,
    vramGB: Number,

    cpuCores: Number,
    ramGB: Number,
    diskGB: Number,

    status: {
      type: String,
      enum: ["online", "offline", "busy", "maintenance"],
      default: "offline",
      index: true,
    },

    pricePerHour: Number,

    runningJobs: {
      type: Number,
      default: 0,
    },

    lastHeartbeat: Date,

    uptimePercentage: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default model<INode>("Node", NodeSchema);
