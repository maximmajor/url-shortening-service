import { Router } from 'express';
import shortLinkController from '../controllers/shortLinkController';

const router = Router();
const controller = new shortLinkController();

router.post('/encode', controller.encode.bind(controller));
router.post('/decode', controller.decode.bind(controller));
router.get('/statistic/:urlPath', controller.statistic.bind(controller));
router.get('/:urlPath', controller.redirectToOriginalUrl.bind(controller));

export default router;