import { DB_NAME } from '../constants.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,);
    console.log('Connected to MongoDB! HOST = ', connectionInstance.connection.host);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
