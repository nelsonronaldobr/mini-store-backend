import { request, response } from 'express';
import mongoose from 'mongoose';
import {
    MESSAGE_DASHBOARD_ERROR_RESPONSE,
    MESSAGE_DASHBOARD_SUCCESS_RESPONSE,
    MESSAGE_ERROR_RESPONSE
} from '../interfaces/message.interface.js';
import { Coupon } from '../models/coupon.model.js';
import { COUPON_STATUS } from '../interfaces/coupon.interface.js';

//import('../interfaces/ResponseTypes.js');

export const startGetCoupon = async (req = request, res = response, next) => {
    const { id } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const coupon = await Coupon.findById(id);

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

export const startCreateCoupon = async (
    req = request,
    res = response,
    next
) => {
    const { code, with_quantity, quantity, discount } = req.body;
    try {
        let coupon = await Coupon.findOne({ code });

        if (coupon) {
            // La categoría ya existe, devuelve un error
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.EXIST_DOCUMENT(coupon)
            });
        }

        coupon = Coupon(req.body);
        coupon.discount_percentage =
            parseFloat(discount.replace('%', '')) / 100;
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
            coupon.with_quantity = with_quantity;
            coupon.quantity = quantity;
        }

        await coupon.save();

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

export const startUpdateCoupon = async (
    req = request,
    res = response,
    next
) => {
    const { id } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    const { code, with_quantity, quantity, discount } = req.body;
    try {
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(400).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }
        coupon.code = code;
        coupon.discount_percentage =
            parseFloat(discount.replace('%', '')) / 100;
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
            coupon.with_quantity = with_quantity;
            coupon.quantity = quantity;
        }

        await coupon.save();

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

export const startDeleteCoupon = async (
    req = request,
    res = response,
    next
) => {
    const { id } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        return res
            .status(400)
            .json({ ok: false, messages: MESSAGE_ERROR_RESPONSE.ARGUMENT });
    }

    try {
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({
                ok: false,
                messages:
                    MESSAGE_DASHBOARD_ERROR_RESPONSE.NOT_FOUND_DOCUMENT(id)
            });
        }

        coupon.status =
            coupon.status === COUPON_STATUS.ACTIVE
                ? COUPON_STATUS.RETIRED
                : COUPON_STATUS.ACTIVE;

        await coupon.save();

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
