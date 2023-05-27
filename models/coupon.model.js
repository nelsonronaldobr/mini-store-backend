import { Schema, model } from "mongoose";

const couponSchema = Schema({
    code: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVO', 'RETIRADO'],
        default: 'RETIRADO'
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

export const Coupon = model('Coupon', couponSchema)