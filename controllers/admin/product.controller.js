import { request, response } from 'express';
import { Product } from '../../models/product.model.js';
import { Category } from '../../models/category.model.js';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../../interfaces/message.interface.js';
import { isValidObjectId } from 'mongoose';
import { PRODUCT_STATUS } from '../../interfaces/product.interface.js';
import slugify from 'slugify';

/* -------------------------------------------------------------------------- */
/*                               CREATE PRODUCT                               */
/* -------------------------------------------------------------------------- */
export const startCreateProduct = async (
    req = request,
    res = response,
    next
) => {
    /* destructuring para tomar los datos */
    const { category, name, ...productData } = req.body;

    try {
        /* comprobar si existe la categoría */
        const categoryExists = await Category.exists({ _id: category });

        if (!categoryExists) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.ARGUMENT
            });
        }

        /* generar el slug a partir del nombre */
        const slug = slugify(name, {
            strict: true,
            lower: true
        });

        /* guardar el producto con la nueva data */
        let product = new Product({
            ...productData,
            category,
            name,
            slug
        });

        await product.save();

        /* realizar populate en la categoría */
        await product.populate('category', 'name');

        const { category: relation, ...rest } = product._doc;
        product = {
            ...rest,
            category: relation.name
        };

        /* devolvemos un mensaje de ok */
        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.CREATED_PRODUCT(product),
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

/* -------------------------------------------------------------------------- */
/*                            UPDATE PRODUCT BY ID                            */
/* -------------------------------------------------------------------------- */
export const startUpdateProduct = async (
    req = request,
    res = response,
    next
) => {
    /* destructuring  para tomar los datos */
    const { id } = req.params;
    const { category } = req.body;
    const { ...update } = req.body;

    try {
        /* comprobar si el param id es valido */
        const isValid = isValidObjectId(id);

        if (!isValid) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.ARGUMENT
            });
        }

        /* comprobar si existe la categoria que recibimos */
        const categoryExists = await Category.exists({ _id: category });

        if (!categoryExists) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.ARGUMENT
            });
        }

        /* guardar el producto con la nueva data */
        let product = await Product.findByIdAndUpdate(
            id,
            { ...update, category },
            {
                new: true
            }
        ).populate('category', 'name');

        /* si el producto no existe retorna un mensaje de error */
        if (!product) {
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        const { category: relation, ...rest } = product._doc;
        product = {
            ...rest,
            category: relation.name
        };

        /* si existe retorna un mensaje de ok */
        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.UPDATED_PRODUCT(product),
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
/* -------------------------------------------------------------------------- */
/*                         TOGGLE STATE PRODUCT BY ID                         */
/* -------------------------------------------------------------------------- */
export const startDeleteProduct = async (
    req = request,
    res = response,
    next
) => {
    /* extraemos el ID de los params */
    const { id } = req.params;
    console.log(id);

    /* validamos si el ID es un ObjectId */
    const isValid = isValidObjectId(id);
    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        /* verificamos que el producto a eliminar existe */
        let product = await Product.findById(id)
            .select('-__v')
            .populate('category', 'name');
        /* si no existe devolvemos un error */
        if (!product) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        /* cambiamos el status del producto dependiendo que estado tenia previamente */
        product.status =
            product.status === PRODUCT_STATUS.ACTIVE
                ? PRODUCT_STATUS.RETIRED
                : PRODUCT_STATUS.ACTIVE;

        /* guardamos el producto actualizado */
        await product.save();

        const { category, ...rest } = product._doc;
        product = {
            ...rest,
            category: category.name
        };

        console.log(product);
        /* si se guardo correctamente devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.TOGGLE_PRODUCT(product),
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
/* -------------------------------------------------------------------------- */
/*                              GET PRODUCT BY ID                             */
/* -------------------------------------------------------------------------- */
export const startGetProduct = async (req = request, res = response, next) => {
    /* extraemos el ID de los params */
    const { slug } = req.params;

    /* validamos si el ID es un ObjectId */
    /* const isValid = isValidObjectId(id);
    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    } */
    try {
        /* buscamos el producto por ID */
        let product = await Product.findOne({ slug })
            .select('-__v')
            .populate('category', 'name');

        /* si no existe retornamos un error */
        if (!product) {
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(slug)
            });
        }

        const { category, ...rest } = product._doc;
        product = {
            ...rest,
            category: category.id
        };

        /* devolvemos un ok */
        return res.status(200).json({
            ok: true,
            product: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
/* -------------------------------------------------------------------------- */
/*                           GET PRODUCTS PAGINATION                          */
/* -------------------------------------------------------------------------- */
export const startGetProducts = async (req = request, res = response, next) => {
    const { _page, _limit, _search } = req.query;
    try {
        const startIndex = Number(_page) * _limit;

        let query = Product.find();
        let totalDocuments;

        if (_search) {
            query = query.where('name', new RegExp(_search, 'i'));
            totalDocuments = await Product.countDocuments(query);
        } else {
            totalDocuments = await Product.countDocuments({});
        }

        let products = await query
            .select('-__v')
            .populate('category', 'name')
            .lean()
            .sort({ _id: -1 })
            .skip(startIndex)
            .limit(Number(_limit));

        const numberOfPages = Math.ceil(totalDocuments / _limit);

        // Transformar los resultados para incluir "category_name" en lugar de "category"
        products = products.map((product) => {
            const { category, ...rest } = product;
            return {
                ...rest,
                category: category.name
            };
        });

        return res.status(200).json({
            ok: true,
            products,
            page: Number(_page),
            numberOfPages,
            totalDocuments
        });
    } catch (error) {
        console.log(error);
    }
};
