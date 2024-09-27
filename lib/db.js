import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Using existing database connection.");
    return cached.conn; // If a cached connection exists, return it
  }

  if (!cached.promise) {
    console.log("Establishing new database connection.");
    const opts = {
      bufferCommands: false,  // Only necessary option here
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("New database connection established.");
      return mongoose;
    }).catch((err) => {
      console.error("Error establishing database connection:", err);  // Log connection errors
      throw new Error('Could not connect to database');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
