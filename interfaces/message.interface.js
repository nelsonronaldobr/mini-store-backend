export const MESSAGE_ERROR_RESPONSE = {
    DEFAULT: {
        type: 'error',
        msg: 'Algo salió mal, Por favor comuniquese con el Administrador.'
    },
    CRENDENTIALS: { type: 'error', msg: 'Credenciales incorrectas.' },
    USER_NOT_EXIST: {
        type: 'error',
        msg: 'La cuenta no existe.'
    },
    EMAIL_EXIST: {
        type: 'error',
        msg: 'El correo se encuentra en uso.'
    },
    USER_BANNED: {
        type: 'error',
        msg: 'Su cuenta se encuentra suspendida, Por favor comuniquese con el Administrador.'
    },
    EMAIL_VERIFY: {
        type: 'error',
        msg: 'Verifique su cuenta, hemos enviado un mail con las intrucciones para que confirme su cuenta.'
    }
};

export const MESSAGE_SUCCESS_RESPONSE = {
    USER_WELCOME: ({ username }) => ({
        type: 'success',
        msg: `Bienvenido ${username}, ¿Como te encuentras el día de hoy?`
    }),
    SEND_EMAIL: {
        type: 'success',
        msg: 'Registro existoso, hemos enviado un mail con las intrucciones para que confirme su cuenta.'
    },
    WELCOME_EMAIL_VERIFIED: ({ username }) => ({
        type: 'success',
        msg: `Bienvenido ${username}, tu cuenta ha sido confirmada correctamente.`
    })
};
