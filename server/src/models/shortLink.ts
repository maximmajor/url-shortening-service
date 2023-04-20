import mongoose from 'mongoose';
import { IShortLink } from '../interfaces/shortLink';

const shortLinkSchema = new mongoose.Schema<IShortLink>(
    { 
        riginalUrl: {
            type: String,
            required: true,
            trim: true,
        },
        shortUrl: {
            type: String,
            required: true,
            trim: true,
        },  
        ShortUrlPart: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);
shortLinkSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
const shortLink = mongoose.model('shortLink', shortLinkSchema);
export default shortLink;