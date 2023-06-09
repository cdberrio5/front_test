import mongoose from 'mongoose';
import env from './../dotenv';

const connectDatabase = async (): Promise<void> => {
  try {
    const MONGODB_URI = env.mongoURI;

    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDatabase;