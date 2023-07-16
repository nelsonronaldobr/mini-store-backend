import { request, response } from 'express';
import { CATEGORY_STATUS } from '../../interfaces/category.interface.js';
import { MESSAGE_ERROR_RESPONSE } from '../../interfaces/message.interface.js';
import { Product } from '../../models/product.model.js';
import { PRODUCT_STATUS } from '../../interfaces/product.interface.js';

const startGetProductsByCategory = async (req = request, res = response) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories', // Reemplaza 'categories' con el nombre de la colección de categorías en tu base de datos
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category_data'
                }
            },
            {
                $unwind: '$category_data'
            },
            {
                $match: {
                    'category_data.status': CATEGORY_STATUS.ACTIVE,
                    status: PRODUCT_STATUS.ACTIVE
                }
            },
            {
                $group: {
                    _id: '$category',
                    category_name: { $first: '$category_data.name' },
                    category_slug: { $first: '$category_data.slug' },
                    products: { $push: '$$ROOT' }
                }
            }
        ]);

        return res.status(200).json({
            ok: true,
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

export { startGetProductsByCategory };
