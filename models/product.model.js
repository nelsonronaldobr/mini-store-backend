import { Schema, model } from 'mongoose';
import { PRODUCT_STATUS } from '../interfaces/product.interface.js';

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
        slug: {
            type: String,
            required: true,
            unique: true
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
            enum: [PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.RETIRED],
            default: PRODUCT_STATUS.RETIRED
        },
        stock: {
            type: Number,
            required: true
        },
        /* -------------------------------------------------------------------------- */
        /*                      DESEAS AGREGAR ALGO A TU PEDIDO?                      */
        /* -------------------------------------------------------------------------- */
        toppings: {
            type: Boolean,
            required: true
        },
        /* -------------------------------------------------------------------------- */
        /*                           SE TE ANTOJA ALGO MÁS?                           */
        /* -------------------------------------------------------------------------- */
        extraItems: {
            type: Boolean,
            required: true
        },
        /* -------------------------------------------------------------------------- */
        /*                                COMPLEMENTOS                                */
        /* -------------------------------------------------------------------------- */
        addon: {
            type: Boolean,
            required: true
        },
        image_paths: [
            {
                name: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        options: [
            {
                name: {
                    type: String,
                    required: true
                }
            }
        ],
        typeOfPersons: {
            type: Number,
            required: true,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

export const Product = model('Product', productSchema);
