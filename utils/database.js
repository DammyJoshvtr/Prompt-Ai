import mongoose, { mongo } from 'mongoose'

let isConnected = false; //track connection status

export const connectionToDB = async () => {
  mongoose.set('strictQuery', true);  // Always set strictQuery to true

  if (isConnected) {
    console.log('MongoDB is already Connected!');
    return;
  }

  // If we re not already Connected, try to establish the connection
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      userNewUrlParser: true,
      useUnifiedTopology: true
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (err) {
      console.log(err)
  }
}