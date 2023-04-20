import mongoose, { ConnectOptions } from 'mongoose';

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  useCreateIndex: boolean;
  useFindAndModify: boolean;
}

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as CustomConnectOptions);
    console.log('Connected to database');
  } catch (error: any) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};