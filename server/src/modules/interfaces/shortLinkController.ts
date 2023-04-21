import { Request, Response } from 'express';

interface IShortLinkController {
  encode(req: Request, res: Response): Promise<void>;
  decode(req: Request, res: Response): Promise<void>;
  statistic(req: Request, res: Response): Promise<void>;
}

  export default IShortLinkController