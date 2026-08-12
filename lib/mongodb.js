import mongoose from "mongoose";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not found in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to DB...");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: true,
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      })
      .then((m) => {
        console.log("MongoDB Connected ✅");
        return m;
      })
      .catch((err) => {
        console.log("MongoDB Error ❌", err.message);
        cached.promise = null; // reset so retry works
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
