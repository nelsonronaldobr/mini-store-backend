import { Schema, model } from 'mongoose';
import { COUPON_STATUS } from '../interfaces/coupon.interface.js';

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
            enum: [COUPON_STATUS.ACTIVE, COUPON_STATUS.RETIRED],
            default: COUPON_STATUS.RETIRED
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
