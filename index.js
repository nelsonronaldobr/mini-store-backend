import express from 'express';
import { connectDB } from './database/connectDB.js';
import { config } from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authenticate.routes.js';
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

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`express corriendo en el puerto ${PORT}`);
});
