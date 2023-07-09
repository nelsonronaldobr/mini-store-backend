import { Schema, model } from 'mongoose';

const addonSchema = Schema(
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

export const Addon = model('Addon', addonSchema);
