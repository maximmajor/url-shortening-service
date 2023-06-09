import { Request, Response } from 'express';
import shortLinkRepository from "../repositories/shortLinkRepository"

class shortLinkController {
  public shortLinkRepository = new shortLinkRepository();

  public async encode(req: Request, res: Response): Promise<void> {
    try {
      const { originalUrl } = req.body;
      if (!originalUrl) {
        res.status(400).json({ error: 'Original URL is required' });
        return;
      }
      const existingUrl = await this.shortLinkRepository.findOneByOriginalUrl(originalUrl);
      const baseUrl = `${req.protocol}://${req.get('host')}/`;
      if (existingUrl) {
        res.json({ shortUrl: existingUrl.shortUrl });
        return;
      }
      const shortLink = await this.shortLinkRepository.createShortUrl(originalUrl, baseUrl);
      res.json({ shortUrl: shortLink.shortUrl });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  public async decode(req: Request, res: Response): Promise<void> {
    try {
      const { shortUrl } = req.body;
      if (!shortUrl) {
        res.status(400).json({ error: 'Short URL is required' });
        return;
      }
      const shortLink = await this.shortLinkRepository.findOneByShortUrl(shortUrl);
      if (!shortLink) {
        res.status(404).json({ error: 'Short URL not found' });
        return;
      }
      res.json({ originalUrl: shortLink.originalUrl });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  public async statistic(req: Request, res: Response): Promise<void> {
    try {
      const { urlpath } = req.params;
      if (!urlpath) {
        res.status(400).json({ error: 'URL path is required' });
        return
      }
      const urlStat = await this.shortLinkRepository.shortUrlPart(urlpath);
      if (!urlStat) {
        res.status(404).json({ error: 'Short URL not found' });
        return
      }
      res.json({ originalUrl: urlStat.originalUrl, shortUrl: urlStat.shortUrl, shortUrlPath: urlStat.shortUrlPath, numberOfClicks: urlStat.numberOfClicks, createdAt: urlStat.createdAt.toDateString(), updatedAt: urlStat.updatedAt.toDateString() });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  public async redirectToOriginalUrl(req: Request, res: Response): Promise<void> {
    try {
      const { urlpath } = req.params;
      if (!urlpath) {
        res.status(400).json({ error: 'URL path is required' });
        return
      }
      const urlStat = await this.shortLinkRepository.shortUrlPart(urlpath);
      if (!urlStat) {
        res.status(404).json({ error: 'Short URL not found' });
        return
      }
      await this.shortLinkRepository.findOneAndUpdateClicks(urlStat._id, urlStat.numberOfClicks + 1);
      res.redirect(urlStat.originalUrl)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default shortLinkController;
