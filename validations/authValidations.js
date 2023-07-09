import { check } from 'express-validator';
import { User } from '../models/user.model.js';

export const loginValidations = [
    check(
        'email',
        'Por favor, ingresa una dirección de correo electrónico válida.'
    ).isEmail(),
    check(
        'password',
        'La contraseña es demasiado corta, debe tener un mínimo de 6 caracteres'
    ).isLength({ min: 6 })
];

export const registerValidations = [
    check('username', 'Por favor ingrese su nombre (mínimo de 2 caracteres).')
        .notEmpty()
        .isLength({ max: 50, min: 2 })
        .custom(async (value) => {
            // Verificar si el nombre de usuario ya está en uso
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            return true;
        }),
    check(
        'email',
        'Por favor, ingresa una dirección de correo electrónico válida.'
    ).isEmail(),
    check(
        'password',
        'La contraseña es demasiado corta, debe tener un mínimo de 6 caracteres'
    ).isLength({ min: 6 })
];
