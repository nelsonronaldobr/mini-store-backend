import { request, response } from 'express';
import { User } from '../../models/user.model.js';
import { tokenSign } from '../../helpers/generateToken.js';
import { bcryptHash, bcryptCompare } from '../../helpers/generateHash.js';
import { generateToken } from '../../helpers/generateId.js';
import {
    isBanned,
    isPending,
    isVerified
} from '../../helpers/statusAccount.js';
import { Role } from '../../models/role.model.js';
import {
    MESSAGE_ERROR_RESPONSE,
    MESSAGE_SUCCESS_RESPONSE
} from '../../interfaces/message.interface.js';
import { USER_STATUS } from '../../interfaces/user.interface.js';
import slugify from 'slugify';

/* -------------------------------------------------------------------------- */
/*                               LOGIN FUNCTION                               */
/* -------------------------------------------------------------------------- */

export const startLogin = async (req = request, res = response, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('-createdAt -updatedAt -token -email -__v')
            .populate('role', 'name');

        if (!user) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.USER_NOT_EXIST
            });
        }
        const result = await bcryptCompare(password, user.password);

        if (!result) {
            return res.status(401).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.CRENDENTIALS
            });
        }

        if (isVerified(user)) {
            const tokenSession = await tokenSign(user);

            return res.status(200).json({
                ok: 'true',
                messages: MESSAGE_SUCCESS_RESPONSE.USER_WELCOME(user),
                user: {
                    username: user.username,
                    photo_url: user.photo_url,
                    role: user.role.name,
                    slug: user.slug
                },
                tokenSession
            });
        } else if (isPending(user)) {
            return res.status(401).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.EMAIL_VERIFY
            });
        } else if (isBanned(user)) {
            return res.status(401).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.USER_BANNED
            });
        }
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
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
/*                              REGISTER FUNCTION                             */
/* -------------------------------------------------------------------------- */
export const startRegister = async (req = request, res = response, next) => {
    const { email, password, username } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.EMAIL_EXIST
            });
        }

        const role = await Role.findOne({ name: 'CUSTOMER' });
        user = User(req.body);
        user.username = username;
        user.slug = slugify(username.toString(), {
            strict: true,
            lower: true
        });
        user.token = generateToken();
        user.password = await bcryptHash(password);
        user.role = role.id;
        await user.save();

        return res.status(200).json({
            ok: 'true',
            messages: MESSAGE_SUCCESS_RESPONSE.SEND_EMAIL
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
/*                               RENEW FUNCTION                               */
/* -------------------------------------------------------------------------- */
export const startRenewToken = async (req = request, res = response, next) => {
    const user = req.user;

    const tokenSession = await tokenSign(user);

    return res.status(200).json({
        ok: 'true',
        messages: MESSAGE_SUCCESS_RESPONSE.USER_WELCOME(user),
        user: {
            username: user.username,
            photo_url: user.photo_url,
            role: user.role.name,
            slug: user.slug
        },
        tokenSession
    });
};

/* -------------------------------------------------------------------------- */
/*                          CONFIRM ACCOUNT FUNCTION                          */
/* -------------------------------------------------------------------------- */
export const startConfirmAccount = async (
    req = request,
    res = response,
    next
) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ token })
            .select('-password -createdAt -updatedAt -token -email -__v')
            .populate('role', 'name');

        if (!user) {
            return res.status(404).json({
                ok: false,
                messages: MESSAGE_ERROR_RESPONSE.DEFAULT
            });
        }

        user.email_verified = true;
        user.status = USER_STATUS.VERIFIED;
        user.token = '';

        await user.save();

        const tokenSession = await tokenSign(user);

        return res.status(200).json({
            ok: 'true',
            messages: MESSAGE_SUCCESS_RESPONSE.WELCOME_EMAIL_VERIFIED(user),
            user: {
                username: user.username,
                photo_url: user.photo_url,
                role: user.role.name,
                slug: user.slug
            },
            tokenSession
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            messages: MESSAGE_ERROR_RESPONSE.DEFAULT
        });
    }
};
