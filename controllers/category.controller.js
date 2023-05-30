import { request, response } from 'express';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../interfaces/message.interface.js';
import { Catergory } from '../models/category.model.js';
import mongoose from 'mongoose';
import { CATEGORY_STATUS } from '../interfaces/category.interface.js';

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

export const startGetCategory = async (req = request, res = response, next) => {
    const { id } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(404)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const category = await Catergory.findById(id).select('-__v');

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

export const startCreateCategory = async (
    req = request,
    res = response,
    next
) => {
    try {
        const category = Catergory(req.body);
        await category.save();

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

export const startUpdateCategory = async (
    req = request,
    res = response,
    next
) => {
    const { id } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(404)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const category = await Catergory.findById(id);

        if (!category) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        category.name = req.body.name;
        await category.save();

        return res.status(200).json({
            ok: true,
            messages:
                MESSAGE_DASHBOARD_SUCCESS_RESPONSE.UPDATED_CATEGORY(category)
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ ok: false });
    }
};

export const startDeleteCategory = async (
    req = request,
    res = response,
    next
) => {
    const { id } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(404)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const category = await Catergory.findById(id);

        if (!category) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        // Cambiar el estado al opuesto
        category.status =
            category.status === CATEGORY_STATUS.ACTIVE
                ? CATEGORY_STATUS.RETIRED
                : CATEGORY_STATUS.ACTIVE;

        await category.save();

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
