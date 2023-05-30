import { Schema, model } from 'mongoose';

const couponSchema = Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        discount: {
            type: String,
            required: true
        },
        discount_percentage: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'RETIRED'],
            default: 'RETIRED'
        },
        with_quantity: {
            type: Boolean,
            default: false
        },
        quantity: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

export const Coupon = model('Coupon', couponSchema);
