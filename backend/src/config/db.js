import mongoose from "mongoose";
import dns from "dns";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing in .env");

  // Wi‑Fi/DNS issue me helpful (optional but recommended)
  dns.setServers(["1.1.1.1", "8.8.8.8"]); // public DNS

  await mongoose.connect(uri, {
    family: 4, // IPv4 prefer
    serverSelectionTimeoutMS: 15000,
  });

  console.log("DB connected");
};
