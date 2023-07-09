import { request, response } from 'express';
import { Topping } from '../../models/topping.model.js';

/* -------------------------------------------------------------------------- */
/*                             CREATE EXAMPLE DATE                            */
/* -------------------------------------------------------------------------- */
export const startCreateExample = async (
    req = request,
    res = response,
    next
) => {
    const toppingsData = [
        {
            name: 'Lechuga',
            price: 3.0
        },
        {
            name: 'Mayonesa',
            price: 3.0
        },
        {
            name: 'Tomate',
            price: 0.0
        },
        {
            name: 'Cebolla',
            price: 0.0
        },
        {
            name: 'Ketchup',
            price: 0.0
        },
        {
            name: 'Salsa BBQ',
            price: 1.0
        },
        {
            name: 'Salsa Stacker',
            price: 1.0
        },
        {
            name: 'Mostaza',
            price: 0.0
        },
        {
            name: 'Pickles',
            price: 0.0
        },
        {
            name: 'Crispy Onion',
            price: 1.0
        },
        {
            name: 'Queso',
            price: 2.0
        },
        {
            name: 'Tocino',
            price: 2.0
        },
        {
            name: 'Chorizo',
            price: 3.0
        },
        {
            name: 'Pollo Junior',
            price: 2.5
        },
        {
            name: 'Chorizo Junior',
            price: 1.5
        },
        {
            name: 'Salsa BBQ Gratis',
            price: 0.0
        },
        {
            name: 'Salsa Stacker Gratis',
            price: 0.0
        },
        {
            name: 'Ají',
            price: 0.0
        },
        {
            name: 'Carne Vegetal',
            price: 6.0
        },
        {
            name: 'Carne XT',
            price: 5.0
        },
        {
            name: 'Pollo',
            price: 3.0
        },
        {
            name: 'Papas al hilo',
            price: 1.0
        },
        {
            name: 'Carne Brava',
            price: 4.0
        },
        {
            name: 'Carne Tradicional',
            price: 4.0
        }
    ];

    try {
        const toppings = await Topping.insertMany(toppingsData);
        res.status(200).json({
            toppings
        });
    } catch (error) {
        console.error('Error al guardar los toppings:', error);
    }
};
