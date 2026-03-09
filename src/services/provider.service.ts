import Provider from "../models/Provider";
import User from "../models/User";
import ApiError from "../utils/ApiError";

export const registerProvider = async (
  userId: string,
  providerName: string,
  location: string,
  publicIp: string
) => {

  const existingProvider = await Provider.findOne({ userId });

  if (existingProvider) {
    throw new ApiError(409, "Provider already exists");
  }

  const provider = await Provider.create({
    userId,
    providerName,
    location,
    publicIp
  });

  await User.findByIdAndUpdate(userId, {
    role: "provider"
  });

  return provider;
};