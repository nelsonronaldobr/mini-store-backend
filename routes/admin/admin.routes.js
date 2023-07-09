import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth.middleware.js';
import roleRouter from './role.routes.js';
import categoryRouter from './category.routes.js';
import couponRouter from './coupon.routes.js';
import productRouter from './product.routes.js';
import imageRouter from './image.routes.js';
import toppingRouter from './topping.routes.js';
import extraItemRouter from './extraItem.routes.js';
import addonItemRouter from './addon.routes.js';

/* DASHBOARD ADMIN - MIDDLEWARES */
const adminRouter = Router();

adminRouter.use(checkAuth);

adminRouter.use('/roles', roleRouter);
adminRouter.use('/categories', categoryRouter);
adminRouter.use('/coupons', couponRouter);
adminRouter.use('/products', productRouter);
adminRouter.use('/images', imageRouter);
adminRouter.use('/toppings', toppingRouter);
adminRouter.use('/addons', addonItemRouter);

export default adminRouter;
