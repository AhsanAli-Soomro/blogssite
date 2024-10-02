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
    // Return the existing connection if it's already established
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((err) => {
      console.error('MongoDB connection error:', err.message);
      throw new Error('Failed to connect to MongoDB');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
