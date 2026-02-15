import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${(error as Error).message}`);
    // In serverless, we might not want to exit(1) as it kills the instance
    // but for debugging it helps show the error in Vercel logs.
    throw error;
  }
};

export default connectDB;
