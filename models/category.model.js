import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['ACTIVO', 'RETIRADO'],
        default: 'RETIRADO'
    }
}, {
    timestamps: true
})

export const Catergory = model('Category', categorySchema)