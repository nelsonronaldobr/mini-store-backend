import { Router } from 'express';
import { check } from 'express-validator';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.middleware.js';
import {
    startGetCoupon,
    startCreateCoupon,
    startUpdateCoupon,
    startDeleteCoupon
} from '../controllers/coupon.controller.js';
import { USER_ROLES } from '../interfaces/user.interface.js';
import { expressValidator } from '../middlewares/expressValidator.middleware.js';

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                CREATE COUPON                               */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [
        checkAuth,
        checkRoleAuth([USER_ROLES.ADMIN]),
        check(
            'code',
            'Por favor ingrese un nombre para el Cupon (mínimo de 2 caracteres).'
        )
            .notEmpty()
            .isLength({ min: 2 }),
        check('discount')
            .notEmpty()
            .withMessage(
                'Por favor ingrese un descuento para el CODE (mínimo de 2 caracteres).'
            )
            .matches(/^\d+%$/)
            .withMessage(
                'El campo discount debe ser un porcentaje válido (por ejemplo, "20%").'
            ),
        expressValidator
    ],
    startCreateCoupon
);

router
    .route('/:id')
    /* -------------------------------------------------------------------------- */
    /*                                 GET COUPON                                 */
    /* -------------------------------------------------------------------------- */
    .get(
        checkAuth,
        checkRoleAuth([USER_ROLES.SALESMAN, USER_ROLES.ADMIN]),
        startGetCoupon
    )
    /* -------------------------------------------------------------------------- */
    /*                                UPDATE COUPON                               */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkAuth,
            checkRoleAuth([USER_ROLES.ADMIN]),
            check(
                'code',
                'Por favor ingrese un nombre para el Cupon (mínimo de 2 caracteres).'
            )
                .notEmpty()
                .isLength({ min: 2 }),
            check('discount')
                .notEmpty()
                .withMessage(
                    'Por favor ingrese un descuento para el CODE (mínimo de 2 caracteres).'
                )
                .matches(/^\d+%$/)
                .withMessage(
                    'El campo discount debe ser un porcentaje válido (por ejemplo, "20%").'
                ),
            expressValidator
        ],
        startUpdateCoupon
    )
    /* -------------------------------------------------------------------------- */
    /*                                DELETE COUPON                               */
    /* -------------------------------------------------------------------------- */
    .delete(checkAuth, checkRoleAuth([USER_ROLES.ADMIN]), startDeleteCoupon);

export default router;
