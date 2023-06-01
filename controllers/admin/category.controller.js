import { request, response } from 'express';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../../interfaces/message.interface.js';
import { Catergory } from '../../models/category.model.js';
import mongoose, { isValidObjectId } from 'mongoose';
import { CATEGORY_STATUS } from '../../interfaces/category.interface.js';

export const startGetCategories = async (
    req = request,
    res = response,
    next
) => {
    try {
        const categories = await Catergory.find().select('-__v');
        return res.status(200).json({
            ok: true,
            categories
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
/*                             GET CATEGORY BY ID                             */
/* -------------------------------------------------------------------------- */
export const startGetCategory = async (req = request, res = response, next) => {
    /* extraemos el ID de los params */
    const { id } = req.params;

    /* validamos si el ID es un ObjectId */
    const isValid = isValidObjectId(id);

    if (!isValid) {
        return res
            .status(404)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        /* buscar categoria por ID */
        const category = await Catergory.findById(id).select('-__v');

        /* devolvemos la categoria en caso exista, si no existe devolvemos un error */
        if (!category) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        return res.status(200).json({
            ok: true,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

export const startCreateCategories = async (
    req = request,
    res = response,
    next
) => {
    const categoryData = [
        { name: 'Frutas', status: 'ACTIVO' },
        { name: 'Verduras', status: 'ACTIVO' },
        { name: 'Carnes', status: 'ACTIVO' },
        { name: 'Lácteos', status: 'ACTIVO' },
        { name: 'Bebidas', status: 'ACTIVO' },
        { name: 'Panadería', status: 'ACTIVO' },
        { name: 'Dulces y Snacks', status: 'ACTIVO' },
        { name: 'Higiene Personal', status: 'ACTIVO' },
        { name: 'Limpieza del Hogar', status: 'ACTIVO' }
    ];

    try {
        const categories = await Catergory.create(categoryData);

        return res.status(200).json({
            ok: true,
            categories
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
/*                               CREATE CATEGORY                              */
/* -------------------------------------------------------------------------- */
export const startCreateCategory = async (
    req = request,
    res = response,
    next
) => {
    /* creamos un nuevo objecto a partir del body */
    const { ...create } = req.body;
    try {
        /* creamos una nueva instancia de categoria con los datos del body */
        const category = Catergory(create);
        /* guardamos la categoria */
        await category.save();

        /* si se guardo correctamente devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.CREATED_CATEGORY(category),
            category
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
/*                            UPDATE CATEGORY BY ID                           */
/* -------------------------------------------------------------------------- */
export const startUpdateCategory = async (
    req = request,
    res = response,
    next
) => {
    /* extraemos el ID de los params */
    const { id } = req.params;
    /* creamos un nuevo objecto a partir del body */
    const { ...update } = req.body;

    /* validamos si el ID es un ObjectId */
    const isValid = isValidObjectId(id);

    if (!isValid) {
        return res
            .status(404)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        /* guardamos la categoria con la nueva data */
        /* new : true para que nos devuelva la categoria actualizada */
        const category = await Catergory.findByIdAndUpdate(
            id,
            { ...update },
            {
                new: true
            }
        );

        /* si la categoria no existe retorna un mensaje de error */
        if (!category) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        /* si existe devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.UPDATED_CATEGORY(category)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false });
    }
};
/* -------------------------------------------------------------------------- */
/*                         TOGGLE STATE CATEGORY BY ID                        */
/* -------------------------------------------------------------------------- */
export const startDeleteCategory = async (
    req = request,
    res = response,
    next
) => {
    /* extraemos el ID de los params */
    const { id } = req.params;
    /* validamos si el ID es un ObjectId */
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(404)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        /* buscamos la categoria por ID */
        const category = await Catergory.findById(id);

        /* en caso no existe devolvemos un error */
        if (!category) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        // Cambiamos el estado opuesto del status ACTIVE | RETIRED
        category.status =
            category.status === CATEGORY_STATUS.ACTIVE
                ? CATEGORY_STATUS.RETIRED
                : CATEGORY_STATUS.ACTIVE;

        /* guardamos la categoria actualizada */
        await category.save();

        /* devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.TOGGLE_CATEGORY(category),
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
