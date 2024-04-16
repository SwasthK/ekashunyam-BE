import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const conInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );
    console.log(`MongoDB connected to HOST : ${conInstance.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection Error!!:${error}`);
  }
};

export default connectDB;
