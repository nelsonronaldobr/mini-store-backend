import { check } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const productValidations = [
    check(
        'name',
        'Por favor ingrese el nombre del producto (mínimo de 2 caracteres).'
    )
        .notEmpty()
        .isLength({ min: 2 }),
    check(
        'description',
        'Por favor ingrese la descripción (mínimo de 2 caracteres).'
    )
        .notEmpty()
        .isLength({ min: 2 }),
    check('price', 'Ingrese un precio valido.').notEmpty().isDecimal(),
    check('category', 'Seleccione una caregoria valida.').custom((value) =>
        isValidObjectId(value)
    ),
    check('stock', 'Ingrese un stock valido.').notEmpty().isInt()
];
