import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectionToDB = async () => {
  mongoose.set('strictQuery', true); // Always set strictQuery to true

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  // If we re not already Connected, try to establish the connection
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}