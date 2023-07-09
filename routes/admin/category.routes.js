import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth.middleware.js';
import { checkRoleAuth } from '../../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../../interfaces/user.interface.js';
import {
    startCreateCategory,
    startGetCategory,
    startDeleteCategory,
    startUpdateCategory,
    startGetCategoriesPerPage,
    startGetCategories
} from '../../controllers/admin/category.controller.js';
import { expressValidator } from '../../middlewares/expressValidator.middleware.js';
import { categoryValidations } from '../../validations/categoryValidations.js';

const router = Router();
/* -------------------------------------------------------------------------- */
/*                               CREATE CATEGORY                              */
/* -------------------------------------------------------------------------- */
router
    .route('/')
    .post(
        [
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...categoryValidations,
            expressValidator
        ],
        startCreateCategory
    )
    .get(startGetCategoriesPerPage);

router.get('/devstore', startGetCategories);

router
    .route('/:id')
    /* -------------------------------------------------------------------------- */
    /*                                GET CATEGORY                                */
    /* -------------------------------------------------------------------------- */
    .get(
        checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
        startGetCategory
    )
    /* -------------------------------------------------------------------------- */
    /*                               UPDATE CATEGORY                              */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...categoryValidations,
            expressValidator
        ],
        startUpdateCategory
    )
    /* -------------------------------------------------------------------------- */
    /*                               DELETE CATEGORY                              */
    /* -------------------------------------------------------------------------- */
    .delete(checkRoleAuth([USER_ROLES.ADMIN]), startDeleteCategory);

export default router;
