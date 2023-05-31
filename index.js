import express from 'express';
import { connectDB } from './database/connectDB.js';
import { config } from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import roleRouter from './routes/role.routes.js';
import categoryRouter from './routes/category.routes.js';
import couponRouter from './routes/coupon.routes.js';
import productRouter from './routes/product.routes.js';
/* -------------------------------------------------------------------------- */
/*                                    INIT                                    */
/* -------------------------------------------------------------------------- */

config();

const app = express();

connectDB();

app.use(cors());

// Lectura y parseo del body
app.use(express.json());

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

/* AUTHENTICATE */
app.use('/api/auth', authRouter);

/* DASHBOARD ADMIN - MIDDLEWARES */
app.use('/api/dashboard/roles', roleRouter);
app.use('/api/dashboard/categories', categoryRouter);
app.use('/api/dashboard/coupons', couponRouter);
app.use('/api/dashboard/products', productRouter);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`express corriendo en el puerto ${PORT}`);
});
