import { Schema, model } from "mongoose";

const orderSchema = Schema({
    sub_total: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    coupon_applied: {
        type: Schema.Types.ObjectId,
        ref: 'Coupon'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['PENDIENTE', 'PAGADO'],
        default: 'PENDIENTE'
    }
}, {
    timestamps: true
})

export const Order = model('Order', orderSchema)