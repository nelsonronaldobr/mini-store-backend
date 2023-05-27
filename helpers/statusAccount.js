import { USER_STATUS } from '../interfaces/user.interface.js';

/* -------------------------------------------------------------------------- */
/*                             STATE ACCOUNT USER                             */
/* -------------------------------------------------------------------------- */

export const isVerified = ({ email_verified, status }) => {
    return email_verified && status === USER_STATUS.VERIFICADO;
};

export const isPending = ({ email_verified, status }) => {
    return !email_verified || status === USER_STATUS.PENDIENTE;
};

export const isBanned = ({ status }) => {
    return status === USER_STATUS.BANEADO;
};
