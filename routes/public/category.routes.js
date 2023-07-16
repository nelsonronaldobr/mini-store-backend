import { Router } from 'express';
import { startGetCategories } from '../../controllers/public/category.controller.js';

const router = Router();

router.get('/', startGetCategories);

export default router;
