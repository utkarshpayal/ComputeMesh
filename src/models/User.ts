import { Schema, model, Document } from "mongoose";

export type UserRole = "user" | "provider" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  balance: number;
  currency: string;
  totalComputeHours: number;
  totalSpent: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      default: "user"
    },

    balance: {
      type: Number,
      default: 0
    },

    currency: {
      type: String,
      default: "USD"
    },

    totalComputeHours: {
      type: Number,
      default: 0
    },

    totalSpent: {
      type: Number,
      default: 0
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);