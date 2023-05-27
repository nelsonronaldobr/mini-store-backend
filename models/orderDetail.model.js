import { Schema, model } from "mongoose";

const orderDetailSchema = Schema({
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {
    timestamps: true
})

export const OrderDetail = model('OrderDetail', orderDetailSchema)