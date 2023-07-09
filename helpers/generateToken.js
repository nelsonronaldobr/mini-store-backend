import jwt from 'jsonwebtoken';
import { getEnvVariable } from './getEnvVariable.js';

const { JWT_SECRET } = getEnvVariable();

/* -------------------------------------------------------------------------- */
/*                             SIGN TOKEN SESSION                             */
/* -------------------------------------------------------------------------- */
export const tokenSign = ({ _id, role }) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id, role: role.name },
            JWT_SECRET,
            { expiresIn: '2h' },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

/* -------------------------------------------------------------------------- */
/*                            VERIFY TOKEN SESSION                            */
/* -------------------------------------------------------------------------- */
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
            if (error) {
                reject(error);
            } else {
                resolve(decodedToken);
            }
        });
    });
};
