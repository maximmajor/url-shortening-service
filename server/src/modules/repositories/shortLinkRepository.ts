import shortid from 'shortid';
import IShortLink from '../interfaces/shortLinkModel';
import shortLinkModel from '../models/shortLinkModel';

class ShortLinkRepository {
  public shortLinkModel = shortLinkModel;


  public async findOneByOriginalUrl(originalUrl: string): Promise<IShortLink | null> {
    console.log(originalUrl)
    const findOriginalUrl = await this.shortLinkModel.findOne({ originalUrl });
    console.log(findOriginalUrl)
    return findOriginalUrl

  }

  public async findOneByShortUrl(ShortUrlPart: string): Promise<IShortLink | null> {
    return await this.shortLinkModel.findOne({ ShortUrlPart });
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