import { Router } from 'express';
import {
    startRegister,
    startRenewToken,
    startLogin,
    startConfirmAccount
} from '../controller/auth.controller.js';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { check } from 'express-validator';
import { expressValidator } from '../middlewares/expressValidator.middleware.js';
const router = Router();

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
router.post(
    '/',
    [
        check(
            'email',
            'Por favor, ingresa una dirección de correo electrónico válida.'
        ).isEmail(),
        check(
            'password',
            'La contraseña es demasiado corta, debe tener un mínimo de 6 caracteres'
        ).isLength({ min: 6 }),
        expressValidator
    ],
    startLogin
);
/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */
router.post(
    '/register',
    [
        check(
            'username',
            'Por favor ingrese su nombre de usuario (mínimo de 2 caracteres).'
        ).notEmpty(),
        check(
            'username',
            'Por favor ingrese su nombre de usuario (límite de 50 caracteres).'
        ).isLength({ max: 50 }),
        check(
            'email',
            'Por favor, ingresa una dirección de correo electrónico válida.'
        ).isEmail(),
        check(
            'password',
            'La contraseña es demasiado corta, debe tener un mínimo de 6 caracteres'
        ).isLength({ min: 6 }),
        expressValidator
    ],
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
