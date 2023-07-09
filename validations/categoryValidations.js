import { check } from 'express-validator';

export const categoryValidations = [
    check(
        'name',
        'Por favor ingrese el nombre de la categoría (mínimo de 2 caracteres).'
    )
        .isString()
        .notEmpty()
        .isLength({ min: 2 })
];
