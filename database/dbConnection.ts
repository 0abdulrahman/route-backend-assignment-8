import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("🟢 Successfully connected to the database!"));
