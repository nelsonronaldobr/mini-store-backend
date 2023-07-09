import { Schema, model } from 'mongoose';

// Esquema de Imagen
const imagenSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Image = model('Image', imagenSchema);
