import mongoose from 'mongoose';

export interface IShortLink extends mongoose.Document {
  riginalUrl: string;
  shortUrl: string;
  ShortUrlPart: string;
}
export default IShortLink