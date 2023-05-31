import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../interfaces/user.interface.js';
import {
    startCreateCategory,
    startGetCategory,
    startDeleteCategory,
    startUpdateCategory
} from '../controllers/category.controller.js';
import { expressValidator } from '../middlewares/expressValidator.middleware.js';
import { categoryValidations } from '../validations/categoryValidations.js';

const router = Router();
/* -------------------------------------------------------------------------- */
/*                               CREATE CATEGORY                              */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [
        checkAuth,
        checkRoleAuth([USER_ROLES.ADMIN]),
        ...categoryValidations,
        expressValidator
    ],
    startCreateCategory
);

router
    .route('/:id')
    /* -------------------------------------------------------------------------- */
    /*                                GET CATEGORY                                */
    /* -------------------------------------------------------------------------- */
    .get(
        checkAuth,
        checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
        startGetCategory
    )
    /* -------------------------------------------------------------------------- */
    /*                               UPDATE CATEGORY                              */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkAuth,
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...categoryValidations,
            expressValidator
        ],
        startUpdateCategory
    )
    /* -------------------------------------------------------------------------- */
    /*                               DELETE CATEGORY                              */
    /* -------------------------------------------------------------------------- */
    .delete(checkAuth, checkRoleAuth([USER_ROLES.ADMIN]), startDeleteCategory);

export default router;
