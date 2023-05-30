import { request, response } from 'express';
import { MESSAGE_ERROR_RESPONSE } from '../interfaces/message.interface.js';

/* -------------------------------------------------------------------------- */
/*                        CHECK AUTH ROLE | MIDDLEWARE                        */
/* -------------------------------------------------------------------------- */

export const checkRoleAuth =
    (roles) =>
    async (req = request, res = response, next) => {
        const { name } = req.user.role;
        try {
            if ([].concat(roles).includes(name)) {
                return next();
            }
            res.status(401).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.AUTHORIZATION
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.DEFAULT
            });
        }
    };
