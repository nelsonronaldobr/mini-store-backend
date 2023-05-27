import { Schema, model } from "mongoose";

const inventorySchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

export const Inventory = model('Inventory', inventorySchema)