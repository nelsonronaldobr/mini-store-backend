import { Schema, model } from 'mongoose';

// Esquema de Toppings
const toppingSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const Topping = model('Topping', toppingSchema);
