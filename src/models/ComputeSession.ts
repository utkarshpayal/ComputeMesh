import { Schema, model, Document, Types } from "mongoose";

export type SessionStatus =
  | "starting"
  | "running"
  | "stopped"
  | "failed";

export interface IComputeSession extends Document {
  userId: Types.ObjectId;
  nodeId: Types.ObjectId;

  dockerImage: string;
  gpuCount: number;

  ports: number[];
  environmentVariables: Record<string, string>;

  status: SessionStatus;

  startTime: Date;
  endTime: Date;

  pricePerHour: number;
  totalCost: number;

  websocketUrl: string;
  sshUrl: string;

  createdAt: Date;
}

const ComputeSessionSchema = new Schema<IComputeSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true
    },

    nodeId: {
      type: Schema.Types.ObjectId,
      ref: "Node",
      index: true
    },

    dockerImage: String,

    gpuCount: Number,

    ports: [Number],

    environmentVariables: {
      type: Map,
      of: String
    },

    status: {
      type: String,
      enum: ["starting", "running", "stopped", "failed"],
      default: "starting",
      index: true
    },

    startTime: Date,
    endTime: Date,

    pricePerHour: Number,
    totalCost: {
      type: Number,
      default: 0
    },

    websocketUrl: String,
    sshUrl: String
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model<IComputeSession>(
  "ComputeSession",
  ComputeSessionSchema
);