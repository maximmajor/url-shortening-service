import shortid from 'shortid';
import IShortLink from '../interfaces/ModelInterface';
import shortLinkModel from '../models/shortLinkModel';

class ShortLinkRepository {
  public shortLinkModel = shortLinkModel;


  public async findOneByOriginalUrl(originalUrl: string): Promise<IShortLink | null> {
    const findOriginalUrl = await this.shortLinkModel.findOne({ originalUrl });
    return findOriginalUrl
  }


  public async shortUrlPart(shortUrlPath: string): Promise<IShortLink | null> {
    const shortUrlPart = await this.shortLinkModel.findOne({ shortUrlPath });
    return shortUrlPart
  }


  public async findOneByShortUrl(shortUrl: string): Promise<IShortLink | null> {
    const findShortUrl = await this.shortLinkModel.findOne({ shortUrl });
    return findShortUrl
  }

  public async findOneAndUpdateClicks(id: string, clickCounts: number): Promise<IShortLink | null> {
    const findandUpdate = await this.shortLinkModel.findByIdAndUpdate({ _id: id }, { numberOfClicks: clickCounts }, { new: true });
    return findandUpdate
  }

  public async createShortUrl(originalUrl: string, baseUrl: string): Promise<IShortLink> {
    const generateShortUrlPath = `${shortid.generate()}`
    const newShortLink = {
      originalUrl: originalUrl,
      shortUrl: `${baseUrl}${generateShortUrlPath}`,
      shortUrlPath: generateShortUrlPath
    };
    const createShortUrl = await this.shortLinkModel.create(newShortLink);
    return createShortUrl
  }
}

export default ShortLinkRepository;