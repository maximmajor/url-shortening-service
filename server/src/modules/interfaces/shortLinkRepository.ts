import IShortLink from "./shortLinkModel";

interface IShortLinkRepository {
    findOneByOriginalUrl(originalUrl: string): Promise<IShortLink | null>;
    findOneByShortUrl(shortUrl: string): Promise<IShortLink | null>;
    createShortUrl(originalUrl: string,  baseUrl: string): Promise<IShortLink>;
  }
  export default IShortLinkRepository