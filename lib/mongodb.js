import mongoose from "mongoose";
import dns from "dns";

// Safely set IPv4 preference and custom DNS servers if available
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
} catch (e) {
  // Ignore DNS order configuration error if not supported
}

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("⚠️ Custom DNS servers fallback to system DNS:", e.message);
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

    cached.promise = (async () => {
      try {
        const m = await mongoose.connect(MONGODB_URI, {
          bufferCommands: true,
          serverSelectionTimeoutMS: 30000,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 45000,
        });
        console.log("MongoDB Connected ✅");
        return m;
      } catch (err) {
        console.warn("MongoDB Connection Error ❌:", err.message);
        // If custom DNS failed, attempt reconnecting with default OS DNS
        if (err.message?.includes("querySrv") || err.message?.includes("ENOTFOUND") || err.message?.includes("ECONNREFUSED")) {
          console.log("🔄 Retrying DB connection with default OS DNS...");
          try {
            // Reset DNS servers to default Node/OS configuration
            dns.setServers([]);
          } catch {}
          const m = await mongoose.connect(MONGODB_URI, {
            bufferCommands: true,
            serverSelectionTimeoutMS: 30000,
          });
          console.log("MongoDB Connected (via OS DNS) ✅");
          return m;
        }
        cached.promise = null;
        throw err;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
};

export default connectDB;
