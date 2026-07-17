import mongoose from 'mongoose';

export let isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000, // 8 seconds for robust MongoDB Atlas cloud TLS handshake
    });
    isMongoConnected = true;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`⚠️ MongoDB Atlas offline or timeout (${error.message}). Backend is running resiliently using in-memory/JSON storage engine!`);
  }
};

export default connectDB;
