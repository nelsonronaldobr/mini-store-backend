import { Router } from 'express';
import {
    startCreateProduct,
    startDeleteProduct,
    startGetProduct,
    startUpdateProduct
} from '../../controllers/admin/product.controller.js';
import { checkRoleAuth } from '../../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../../interfaces/user.interface.js';
import { expressValidator } from '../../middlewares/expressValidator.middleware.js';
import { productValidations } from '../../validations/productValidations.js';

const router = Router();
/* -------------------------------------------------------------------------- */
/*                               CREATE PRODUCT                               */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [
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
    .get(checkRoleAuth([USER_ROLES.ADMIN]), startGetProduct)
    /* -------------------------------------------------------------------------- */
    /*                               UPDATE PRODUCT                               */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...productValidations,
            expressValidator
        ],
        startUpdateProduct
    )
    /* -------------------------------------------------------------------------- */
    /*                               DELETE PRODUCT                               */
    /* -------------------------------------------------------------------------- */
    .delete(checkRoleAuth([USER_ROLES.ADMIN]), startDeleteProduct);

export default router;
