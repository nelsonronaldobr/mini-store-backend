import { Schema, model } from 'mongoose';

const extraItemSchema = Schema(
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

export const ExtraItem = model('ExtraItem', extraItemSchema);
