import { USER_STATUS } from '../interfaces/user.interface.js';

/* -------------------------------------------------------------------------- */
/*                             STATE ACCOUNT USER                             */
/* -------------------------------------------------------------------------- */

export const isVerified = ({ email_verified, status }) => {
    return email_verified && status === USER_STATUS.VERIFIED;
};

export const isPending = ({ email_verified, status }) => {
    return !email_verified || status === USER_STATUS.PENDING;
};

export const isBanned = ({ status }) => {
    return status === USER_STATUS.BANNED;
};
