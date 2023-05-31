import { Router } from 'express';
import {
    startCreateProduct,
    startDeleteProduct,
    startGetProduct,
    startUpdateProduct
} from '../controllers/product.controller.js';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../interfaces/user.interface.js';
import { expressValidator } from '../middlewares/expressValidator.middleware.js';
import { productValidations } from '../validations/productValidations.js';

const router = Router();
/* -------------------------------------------------------------------------- */
/*                               CREATE PRODUCT                               */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [
        checkAuth,
        checkRoleAuth([USER_ROLES.ADMIN]),
        ...productValidations,
        expressValidator
    ],
    startCreateProduct
);

router
    .route('/:id')
    /* -------------------------------------------------------------------------- */
    /*                                 GET PRODUCT                                */
    /* -------------------------------------------------------------------------- */
    .get(checkAuth, checkRoleAuth([USER_ROLES.ADMIN]), startGetProduct)
    /* -------------------------------------------------------------------------- */
    /*                               UPDATE PRODUCT                               */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkAuth,
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...productValidations,
            expressValidator
        ],
        startUpdateProduct
    )
    /* -------------------------------------------------------------------------- */
    /*                               DELETE PRODUCT                               */
    /* -------------------------------------------------------------------------- */
    .delete(checkAuth, checkRoleAuth([USER_ROLES.ADMIN]), startDeleteProduct);

export default router;
