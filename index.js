import express from 'express';
import { connectDB } from './database/connectDB.js';
import { config } from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import roleRouter from './routes/role.routes.js';
import categoryRouter from './routes/category.routes.js';
import couponRouter from './routes/coupon.routes.js';
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

app.use('/api/auth', authRouter);
app.use('/api/dashboard/role', roleRouter);
app.use('/api/dashboard/category', categoryRouter);
app.use('/api/dashboard/coupon', couponRouter);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`express corriendo en el puerto ${PORT}`);
});
