import mongoose from "mongoose";
import dns from "dns";

// Force IPv4 first — fixes many "ENOTFOUND"/"ETIMEOUT" DNS issues on
// serverless platforms (Node 18+ defaults to IPv6-first in some envs)
dns.setDefaultResultOrder("ipv4first");

// Only override DNS servers if you actually need to (e.g. corporate/blocked
// resolver). This is what breaks SRV lookups most often — try commenting
// it out first if you still get errors.
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  console.warn("⚠️ Could not set custom DNS servers:", err.message);
}

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
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        family: 4, // force IPv4, avoids DNS resolution issues with SRV records
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
