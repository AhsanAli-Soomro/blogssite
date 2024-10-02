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
    // If the connection is already established, return it
    return cached.conn;
  }

  if (!cached.promise) {
    // If no connection promise exists, create a new one
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,        // For handling new URL strings
      useUnifiedTopology: true,     // Ensures connection is managed properly
      useCreateIndex: true,         // Ensures proper indexing
      useFindAndModify: false,      // Use native findOneAndUpdate rather than deprecated methods
      bufferCommands: false,        // Disable mongoose buffering commands
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30s
    }).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
      throw err; // Ensure error propagates and is caught elsewhere
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
