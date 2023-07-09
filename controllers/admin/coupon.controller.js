import { request, response } from 'express';
import mongoose, { isValidObjectId } from 'mongoose';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../../interfaces/message.interface.js';
import { Coupon } from '../../models/coupon.model.js';
import { COUPON_STATUS } from '../../interfaces/coupon.interface.js';

//import('../interfaces/ResponseTypes.js');

/* -------------------------------------------------------------------------- */
/*                              GET COUPON BY ID                              */
/* -------------------------------------------------------------------------- */
export const startGetCoupon = async (req = request, res = response, next) => {
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
        /* buscar el cupon por ID */
        const coupon = await Coupon.findById(id);
        /* devolvemos el cupon en caso exista, si no existe devolvemos un error */
        if (!coupon) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        return res.status(200).json({
            ok: true,
            coupon
        });
    } catch (error) {
        console.log(error);

        return res.status(404).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

/* -------------------------------------------------------------------------- */
/*                                CREATE COUPON                               */
/* -------------------------------------------------------------------------- */
export const startCreateCoupon = async (
    req = request,
    res = response,
    next
) => {
    const { code, with_quantity, quantity, discount } = req.body;
    try {
        /* verificamos si el code del cupon sea unico */
        let coupon = await Coupon.findOne({ code });

        if (coupon) {
            // si el cupon ya existe, devuelve un error
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.EXIST_DOCUMENT(coupon)
            });
        }
        /* creamos una instancia de cupon con los datos del body */
        coupon = Coupon(req.body);
        /* calcumos el el descuento 20% = 0.2*/
        coupon.discount_percentage =
            parseFloat(discount.replace('%', '')) / 100;
        /* verificamos si el cupon tendra un limite de cantidad */
        if (with_quantity) {
            if (!quantity) {
                return res.status(404).json({
                    ok: false,
                    messages:
                        MESSAGE_DASHBOARD_ERROR_RESPONSE.REQUIRED_FIELD(
                            'quantity'
                        )
                });
            }
            /* añadimos la cantidad que tendra ese cupon */
            coupon.with_quantity = with_quantity;
            coupon.quantity = quantity;
        }
        /* guardamos el cupon */
        await coupon.save();
        /* si se guardo correctamente devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages: MESSAGE_DASHBOARD_SUCCESS_RESPONSE.CREATED_COUPON(coupon),
            coupon
        });
    } catch (error) {
        console.log(error);

        return res.status(404).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

/* -------------------------------------------------------------------------- */
/*                            UPDATE CATEGORY BY ID                           */
/* -------------------------------------------------------------------------- */
export const startUpdateCoupon = async (
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

    const { code, with_quantity, quantity, discount } = req.body;
    try {
        /* buscamos el cupon por ID */
        const coupon = await Coupon.findById(id);
        /* si el cupon que queremos actualizar no existe, devolvemos un error */
        if (!coupon) {
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        /* actualizamos el code */
        coupon.code = code;
        /* calcumos el el descuento 20% = 0.2*/
        coupon.discount_percentage =
            parseFloat(discount.replace('%', '')) / 100;
        /* verificamos si el cupon tendra un limite de cantidad */
        if (with_quantity) {
            if (!quantity) {
                return res.status(404).json({
                    ok: false,
                    messages:
                        MESSAGE_DASHBOARD_ERROR_RESPONSE.REQUIRED_FIELD(
                            'quantity'
                        )
                });
            }
            /* añadimos la cantidad que tendra ese cupon */
            coupon.with_quantity = with_quantity;
            coupon.quantity = quantity;
        }
        /* guardamos el cupon actualizado */
        await coupon.save();
        /* si se guardo correctamente devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages: MESSAGE_DASHBOARD_SUCCESS_RESPONSE.UPDATED_COUPON(coupon),
            coupon
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};

/* -------------------------------------------------------------------------- */
/*                          TOGGLE STATE COUPON BY ID                         */
/* -------------------------------------------------------------------------- */
export const startDeleteCoupon = async (
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
        /* verificamos que el cupon a eliminar existe */
        const coupon = await Coupon.findById(id);
        /* si no existe devolvemos un error */
        if (!coupon) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        /* cambiamos el status del cupon dependiendo que estado tenia previamente */
        coupon.status =
            coupon.status === COUPON_STATUS.ACTIVE
                ? COUPON_STATUS.RETIRED
                : COUPON_STATUS.ACTIVE;

        /* guardamos el cupon actualizado */
        await coupon.save();
        /* si se guardo correctamente devolvemos un ok */
        return res.status(200).json({
            ok: true,
            messages: MESSAGE_DASHBOARD_SUCCESS_RESPONSE.TOGGLE_COUPON(coupon)
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
