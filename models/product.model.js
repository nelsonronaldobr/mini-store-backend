import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        enum: ['ACTIVO', 'RETIRADO'],
        default: 'RETIRADO'
    }
}, {
    timestamps: true
})

export const Product = model('Product', productSchema)