import express from 'express';
import { connectDB } from './config/connectDB.js';
import cors from 'cors';
import authRouter from './routes/auth/auth.routes.js';
import adminRouter from './routes/admin/admin.routes.js';
import { Server } from 'socket.io';
import { getEnvVariable } from './helpers/getEnvVariable.js';
/* -------------------------------------------------------------------------- */
/*                                    INIT                                    */
/* -------------------------------------------------------------------------- */

const app = express();

const { PORT, FRONTEND_URL } = getEnvVariable();

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
app.use('/api/admin/', adminRouter);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */

const server = app.listen(PORT || 4000, () => {
    console.log(`express corriendo en el puerto ${PORT}`);
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('conectado socket.io');
    socket.on('setRoom', (value) => {
        socket.join(value);
    });
    socket.on('newCategory', () => {
        socket.to('admin').emit('refreshCategories');
        socket.to('salesman').emit('refreshCategories');
    });
    socket.on('deleteCategory', () => {
        socket.to('admin').emit('refreshCategories');
        socket.to('salesman').emit('refreshCategories');
    });
    socket.on('updateCategory', () => {
        socket.to('admin').emit('refreshCategories');
        socket.to('salesman').emit('refreshCategories');
    });
    //=======================================================
    socket.on('createProduct', (product) => {
        const rooms = socket.rooms; // Obtener las salas del socket
        console.log('Salas del socket:', rooms);
        console.log('entro');
        socket.to('admin').emit('addProduct', product);
        socket.to('salesman').emit('addProduct', product);
    });
    socket.on('updateProduct', (product) => {
        const rooms = socket.rooms; // Obtener las salas del socket
        console.log('Salas del socket:', rooms);
        console.log('entro');
        socket.to('admin').emit('refreshProducts', product);
        socket.to('salesman').emit('refreshProducts', product);
    });
    socket.on('deleteProduct', (product) => {
        const rooms = socket.rooms; // Obtener las salas del socket
        console.log('Salas del socket:', rooms);
        console.log('entro');
        socket.to('admin').emit('refreshProducts', product);
        socket.to('salesman').emit('refreshProducts', product);
    });
});
