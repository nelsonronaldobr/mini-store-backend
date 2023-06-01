import { request, response } from 'express';
import { Product } from '../../models/product.model.js';
import { Catergory } from '../../models/category.model.js';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../../interfaces/message.interface.js';
import { isValidObjectId } from 'mongoose';
import { PRODUCT_STATUS } from '../../interfaces/product.interface.js';

/* -------------------------------------------------------------------------- */
/*                               CREATE PRODUCT                               */
/* -------------------------------------------------------------------------- */
export const startCreateProduct = async (
    req = request,
    res = response,
    next
) => {
    /* destructuring  para tomar los datos */
    const { category } = req.body;
    try {
        /* comprobar si existe la categoria */
        const categoryExists = await Catergory.exists({ _id: category });

        if (!categoryExists) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.ARGUMENT
            });
        }
        /*  guardamos el producto en caso la categoria exista */
        const product = Product(req.body);
        product.category = category;
        await product.save();

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
        const categoryExists = await Catergory.exists({ _id: category });

        if (!categoryExists) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.ARGUMENT
            });
        }

        /* guardar el producto con la nueva data */
        const product = await Product.findByIdAndUpdate(
            id,
            { ...update, category },
            {
                new: true
            }
        );

        /* si el producto no existe retorna un mensaje de error */
        if (!product) {
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

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

    /* validamos si el ID es un ObjectId */
    const isValid = isValidObjectId(id);
    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        /* verificamos que el producto a eliminar existe */
        const product = await Product.findById(id);
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
        /* si se guardo correctamente devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages: MESSAGE_DASHBOARD_SUCCESS_RESPONSE.TOGGLE_PRODUCT(product)
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
    const { id } = req.params;

    /* validamos si el ID es un ObjectId */
    const isValid = isValidObjectId(id);
    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }
    try {
        /* buscamos el producto por ID */
        const product = await Product.findById(id).populate('category', 'name');
        /* si no existe retornamos un error */
        if (!product) {
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        /* devolvemos un ok */
        return res.status(200).json({
            ok: true,
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
