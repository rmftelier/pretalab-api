import mongoose from "mongoose";

export async function connectToMongo(URL: string) {
  try {
    await mongoose.connect(URL);
    console.log('🟢 Successfully connected to MongoDB Atlas.');
  } catch (error) {
    console.log(console.log('🔴 Error connecting to MongoDB Atlas: ', error));
    process.exit(1);
  }

}
