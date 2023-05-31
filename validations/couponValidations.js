import { check } from 'express-validator';

export const couponValidations = [
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
        )
];
