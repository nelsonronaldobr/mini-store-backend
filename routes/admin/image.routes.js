import { Router } from 'express';
import { __dirname } from '../../helpers/globals.js';
import multer from 'multer';
import {
    startUploadImagesByProduct,
    startGetImagesByProduct,
    startDeleteImageByProduct,
    startUpdateOrderImagesByProduct
} from '../../controllers/admin/images.controller.js';
import { checkRoleAuth } from '../../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../../interfaces/user.interface.js';

const router = Router();

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        let message = '';
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                message = 'El tamaño del archivo excede el límite permitido.';
                break;
            case 'LIMIT_UNEXPECTED_FILE':
                message = 'Se ha enviado un número inesperado de archivos.';
                break;
            default:
                message = 'Error en la carga de archivos.';
        }
        res.status(400).json({ error: 'Error de carga de archivos', message });
    } else {
        next(err);
    }
};

// Configuración de Multer
const upload = multer({ storage: multer.memoryStorage() });

router
    .route('/:id')
    .post(
        checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
        upload.array('images', 4),
        multerErrorHandler,
        startUploadImagesByProduct
    )
    .delete(
        checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
        startDeleteImageByProduct
    )
    .put(
        checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
        startUpdateOrderImagesByProduct
    );

router.get(
    '/:slug',
    checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
    startGetImagesByProduct
);

export default router;
