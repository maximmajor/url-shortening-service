import mongoose from 'mongoose';

export interface IShortLink extends mongoose.Document {
  originalUrl: string;
  shortUrl: string;
  ShortUrlPart: string;
  createdAt: Date;
  updatedAt: Date;
}
export default IShortLink