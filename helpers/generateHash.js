import bcrypt from 'bcrypt';

/* -------------------------------------------------------------------------- */
/*                                GENERATE HASH                               */
/* -------------------------------------------------------------------------- */
export const bcryptHash = async (password = '', salt = 10) => {
    try {
        const convert = password.toString();
        const generateSalt = await bcrypt.genSalt(salt);
        const newPassword = await bcrypt.hash(convert, generateSalt);
        return newPassword;
    } catch (error) {
        console.log(error);
    }
};

/* -------------------------------------------------------------------------- */
/*                         COMPARE HASH WITH PASSWORD                         */
/* -------------------------------------------------------------------------- */
export const bcryptCompare = async (password, passwordHash) => {
    try {
        const validate = await bcrypt.compare(password, passwordHash);
        return validate;
    } catch (error) {
        console.log(error);
    }
};
