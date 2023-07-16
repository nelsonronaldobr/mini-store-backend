import { Router } from 'express';
import { startGetProductsByCategory } from '../../controllers/public/product.controller.js';

const router = Router();

router.get('/', startGetProductsByCategory);

export default router;
