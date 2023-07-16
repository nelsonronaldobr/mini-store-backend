import { Schema, model } from 'mongoose';
import { CATEGORY_STATUS } from '../interfaces/category.interface.js';

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: [CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.RETIRED],
            default: CATEGORY_STATUS.RETIRED
        }
    },
    {
        timestamps: true
    }
);

export const Category = model('Category', categorySchema);
