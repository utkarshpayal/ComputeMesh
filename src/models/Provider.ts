import { Schema, model, Document, Types } from "mongoose";

export interface IProvider extends Document {
  userId: Types.ObjectId;
  providerName: string;
  location: string;
  publicIp: string;
  totalEarned: number;
  payoutAddress: string;
  uptimeScore: number;
  isVerified: boolean;
  totalNodes: number;
  activeNodes: number;
  createdAt: Date;
}

const ProviderSchema = new Schema<IProvider>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true
    },

    providerName: {
      type: String,
      required: true
    },

    location: {
      type: String
    },

    publicIp: {
      type: String
    },

    totalEarned: {
      type: Number,
      default: 0
    },

    payoutAddress: {
      type: String
    },

    uptimeScore: {
      type: Number,
      default: 100
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    totalNodes: {
      type: Number,
      default: 0
    },

    activeNodes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model<IProvider>("Provider", ProviderSchema);