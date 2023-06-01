import { request, response } from 'express';
import { MESSAGE_ERROR_RESPONSE } from '../../interfaces/message.interface.js';
import { Role } from '../../models/role.model.js';

export const startGetRoles = async (req = request, res = response, next) => {
    try {
        const roles = await Role.find().select('-__v');
        res.status(200).json({
            ok: true,
            roles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
const startCreateRoles = async (req = request, res = response, next) => {
    const rolesData = [
        { name: 'CUSTOMER' },
        { name: 'SALESMAN' },
        { name: 'ADMIN' }
    ];

    try {
        const roles = await Role.create(rolesData);

        return res.status(200).json({
            ok: true,
            roles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
