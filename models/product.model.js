import { Schema, model } from 'mongoose';

const productSchema = Schema(
    {
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
            enum: ['ACTIVE', 'RETIRED'],
            default: 'RETIRED'
        },
        stock: {
            type: Number,
            required: true
        },
        image_paths: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

export const Product = model('Product', productSchema);
