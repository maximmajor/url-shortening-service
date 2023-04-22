import mongoose from 'mongoose';

export interface IShortLink extends mongoose.Document {
  originalUrl: string;
  shortUrl: string;
  shortUrlPath: string;
  createdAt: Date;
  updatedAt: Date;
}
export default IShortLink