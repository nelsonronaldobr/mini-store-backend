import { request, response } from 'express';
import { Category } from '../../models/category.model.js';
import { CATEGORY_STATUS } from '../../interfaces/category.interface.js';
import { MESSAGE_ERROR_RESPONSE } from '../../interfaces/message.interface.js';

const startGetCategories = async (req = request, res = response) => {
    try {
        const categories = await Category.find()
            .where('status', CATEGORY_STATUS.ACTIVE)
            .select('-__v -status -createdAt -updatedAt');

        return res.status(200).json({
            ok: true,
            categories
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

export { startGetCategories };
