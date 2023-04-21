import mongoose from 'mongoose';
import { IShortLink } from '../interfaces/shortLinkModel';

const shortLinkSchema = new mongoose.Schema<IShortLink>(
    { 
        originalUrl: {
            type: String,
            required: true,
            trim: true,
        },
        shortUrl: {
            type: String,
            trim: true,
            unique: true 
        },  
        ShortUrlPart: {
            type: String,
            trim: true,
            unique: true,
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
const shortLinkModel = mongoose.model('shortLink', shortLinkSchema);
export default shortLinkModel;