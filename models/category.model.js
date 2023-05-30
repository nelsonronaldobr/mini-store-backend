import { Schema, model } from 'mongoose';

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'RETIRED'],
            default: 'RETIRED'
        }
    },
    {
        timestamps: true
    }
);

export const Catergory = model('Category', categorySchema);
