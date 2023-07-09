import { Router } from 'express';
import { startCreateExample } from '../../controllers/admin/addon.contoller.js';

const router = Router();

router.route('/').get().post();

router.get('/example', startCreateExample);

export default router;
