import { Router } from 'express';
import {
    startRegister,
    startRenewToken,
    startLogin,
    startConfirmAccount
} from '../../controllers/auth/auth.controller.js';
import { checkAuth } from '../../middlewares/checkAuth.middleware.js';
import { expressValidator } from '../../middlewares/expressValidator.middleware.js';
import {
    loginValidations,
    registerValidations
} from '../../validations/authValidations.js';
const router = Router();

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
router.post('/', [...loginValidations, expressValidator], startLogin);
/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */
router.post(
    '/register',
    [...registerValidations, expressValidator],
    startRegister
);
/* -------------------------------------------------------------------------- */
/*                                    RENEW                                   */
/* -------------------------------------------------------------------------- */
router.get('/renew', checkAuth, startRenewToken);
/* -------------------------------------------------------------------------- */
/*                               CONFIRM ACCOUNT                              */
/* -------------------------------------------------------------------------- */
router.get('/confirm-account/:token', startConfirmAccount);

export default router;
