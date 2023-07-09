import { Router } from 'express';
import {
    startCreateProduct,
    startDeleteProduct,
    startGetProduct,
    startGetProducts,
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
router
    .route('/')
    .post(
        [
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...productValidations,
            expressValidator
        ],
        startCreateProduct
    )
    .get(startGetProducts);

/* -------------------------------------------------------------------------- */
/*                                 GET PRODUCT                                */
/* -------------------------------------------------------------------------- */
router.get('/:slug', checkRoleAuth([USER_ROLES.ADMIN]), startGetProduct);

router
    .route('/:id')

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
