import express from 'express';
import { connectDB } from './database/connectDB.js';
import { config } from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth/auth.routes.js';
import adminRouter from './routes/admin/admin.routes.js';
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
app.use('/api/dashboard/', adminRouter);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`express corriendo en el puerto ${PORT}`);
});
