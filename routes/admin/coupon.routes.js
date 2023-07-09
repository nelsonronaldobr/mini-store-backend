import { Router } from 'express';
import { checkRoleAuth } from '../../middlewares/checkRoleAuth.middleware.js';
import {
    startGetCoupon,
    startCreateCoupon,
    startUpdateCoupon,
    startDeleteCoupon
} from '../../controllers/admin/coupon.controller.js';
import { USER_ROLES } from '../../interfaces/user.interface.js';
import { expressValidator } from '../../middlewares/expressValidator.middleware.js';
import { couponValidations } from '../../validations/couponValidations.js';

const router = Router();
/* -------------------------------------------------------------------------- */
/*                                CREATE COUPON                               */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [checkRoleAuth([USER_ROLES.ADMIN]), ...couponValidations, expressValidator],
    startCreateCoupon
);

router
    .route('/:id')
    /* -------------------------------------------------------------------------- */
    /*                                 GET COUPON                                 */
    /* -------------------------------------------------------------------------- */
    .get(checkRoleAuth([USER_ROLES.SALESMAN, USER_ROLES.ADMIN]), startGetCoupon)
    /* -------------------------------------------------------------------------- */
    /*                                UPDATE COUPON                               */
    /* -------------------------------------------------------------------------- */
    .put(
        [
            checkRoleAuth([USER_ROLES.ADMIN]),
            ...couponValidations,
            expressValidator
        ],
        startUpdateCoupon
    )
    /* -------------------------------------------------------------------------- */
    /*                                DELETE COUPON                               */
    /* -------------------------------------------------------------------------- */
    .delete(checkRoleAuth([USER_ROLES.ADMIN]), startDeleteCoupon);

export default router;
