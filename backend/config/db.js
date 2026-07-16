import mongoose from 'mongoose';

export let isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`⚠️ MongoDB daemon offline (${error.message}). Backend is running resiliently using in-memory/JSON storage engine!`);
  }
};

export default connectDB;
