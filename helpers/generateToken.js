import jwt from 'jsonwebtoken';

/* -------------------------------------------------------------------------- */
/*                             SIGN TOKEN SESSION                             */
/* -------------------------------------------------------------------------- */
export const tokenSign = async ({ _id, role }) => {
    return jwt.sign(
        {
            _id: _id,
            role: role.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );
};

/* -------------------------------------------------------------------------- */
/*                            VERIFY TOKEN SESSION                            */
/* -------------------------------------------------------------------------- */
export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};
