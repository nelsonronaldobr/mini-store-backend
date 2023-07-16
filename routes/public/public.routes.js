import { Router } from 'express';
import productRouter from './product.routes.js';
import categoryRouter from './category.routes.js';
const publicRouter = Router();

publicRouter.use('/products', productRouter);
publicRouter.use('/categories', categoryRouter);

export default publicRouter;
