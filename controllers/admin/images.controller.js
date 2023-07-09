import { request, response } from 'express';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../../interfaces/message.interface.js';
import cloudinary from 'cloudinary';
import { getEnvVariable } from '../../helpers/getEnvVariable.js';
import path from 'path';
import DataURIParser from 'datauri/parser.js';
import { Image } from '../../models/images.model.js';
import { Product } from '../../models/product.model.js';
import { log } from 'console';
import { isValidObjectId } from 'mongoose';

const { CLD_CLOUD_NAME, CLD_API_KEY, CLD_API_SECRET } = getEnvVariable();

// Configuración de Cloudinary
cloudinary.v2.config({
    cloud_name: CLD_CLOUD_NAME,
    api_key: CLD_API_KEY,
    api_secret: CLD_API_SECRET
});

export const startUploadImagesByProduct = async (
    req = request,
    res = response
) => {
    const { id } = req.params;

    const isValid = isValidObjectId(id);

    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const files = req.files; // Array de archivos subidos
        const datUri = new DataURIParser();

        // Verificar el número de imágenes subidas
        if (files.length > 4) {
            return res.status(400).json({
                ok: false,
                message: MESSAGE_DASHBOARD_ERROR_RESPONSE.LIMIT_EXCEEDED_IMAGES
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        const countImage = product.image_paths.length + files.length;
        if (countImage > 4) {
            return res.status(404).json({
                ok: false,
                messages: MESSAGE_DASHBOARD_ERROR_RESPONSE.LIMIT_EXCEEDED_IMAGES
            });
        }

        const uploadPromises = files.map((file) => {
            const image = datUri.format(
                path.extname(file.originalname).toString(),
                file.buffer
            ).content;

            return cloudinary.v2.uploader.upload(image, {
                folder: 'products'
            });
        });

        const results = await Promise.allSettled(uploadPromises);

        const images = results.map((image) => {
            const { secure_url, public_id } = image.value;
            return { url: secure_url, name: public_id };
        });

        product.image_paths = [...product.image_paths, ...images];
        await product.save();

        /* devolvemos un ok */
        return res.status(200).json({
            ok: true,
            images: product.image_paths,
            messages: {
                type: 'success',
                msg: `${files.length} Imagenes subidas con exito!`
            }
        });
    } catch (error) {
        console.error('Error al subir las imágenes a Cloudinary:', error);
        res.status(500).json({
            error: 'Error al subir las imágenes a Cloudinary'
        });
    }
};

export const startGetImagesByProduct = async (
    req = request,
    res = response
) => {
    const { slug } = req.params;
    try {
        const product = await Product.findOne({ slug });

        if (!product) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        /* devolvemos un ok */
        return res.status(200).json({
            ok: true,
            images: product.image_paths,
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

export const startDeleteImageByProduct = async (
    req = request,
    res = response
) => {
    const { id } = req.params;
    const { imageName } = req.body;

    const isValid = isValidObjectId(id);

    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        const index = product.image_paths.findIndex(
            (image) => image.name === imageName
        );

        if (index === -1) {
            return res.status(404).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.ARGUMENT
            });
        }

        const imageToDelete = product.image_paths[index].name;

        await cloudinary.v2.uploader.destroy(imageToDelete);

        product.image_paths.splice(index, 1);

        // Guardar los cambios en la base de datos
        await product.save();

        return res.status(200).json({
            ok: true,
            messages: MESSAGE_DASHBOARD_SUCCESS_RESPONSE.DELETE_IMAGE(imageName)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages:
                MESSAGE_DASHBOARD_ERROR_RESPONSE.IMAGE_NOT_EXIST(imageName)
        });
    }
};

export const startUpdateOrderImagesByProduct = async (req, res) => {
    const { id } = req.params;

    const isValid = isValidObjectId(id);

    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    const { ...update } = req.body;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        await Product.findByIdAndUpdate(product.id, {
            $unset: { image_paths: 1 }
        });

        await Product.findByIdAndUpdate(product.id, {
            $push: { image_paths: { $each: update.images } }
        });

        res.json({
            ok: true,
            messages: MESSAGE_DASHBOARD_SUCCESS_RESPONSE.ORDER_IMAGES,
            images: product.image_paths
        });
    } catch (error) {
        console.error('Error al subir las imágenes a Cloudinary:', error);
        res.status(500).json({
            error: 'Error al subir las imágenes a Cloudinary'
        });
    }
};
