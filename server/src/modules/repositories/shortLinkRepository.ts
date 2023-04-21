import shortid from 'shortid';
import IShortLink from '../interfaces/shortLinkModel';
import shortLinkModel from '../models/shortLinkModel';

class ShortLinkRepository {
  public shortLinkModel = shortLinkModel;


  public async findOneByOriginalUrl(originalUrl: string): Promise<IShortLink | null> {
    const findOriginalUrl = await this.shortLinkModel.findOne({ originalUrl });
    return findOriginalUrl
  }


  public async shortUrlPart(ShortUrlPart: string): Promise<IShortLink | null> {
    const shortUrlPart = await this.shortLinkModel.findOne({ ShortUrlPart });
    return shortUrlPart
  }


  public async findOneByShortUrl(shortUrl: string): Promise<IShortLink | null> {
   const findShortUrl = await this.shortLinkModel.findOne({ shortUrl });
   return findShortUrl
  }

  public async createShortUrl(originalUrl: string, baseUrl: string): Promise<IShortLink> {  
    const generateShortUrlPath = `${shortid.generate()}`
    const newShortLink = {
      originalUrl: originalUrl,
      shortUrl: `${baseUrl}${generateShortUrlPath}`,
      ShortUrlPart: generateShortUrlPath
    };
    const createShortUrl = await this.shortLinkModel.create(newShortLink);
    return createShortUrl
  }
}

export default ShortLinkRepository;