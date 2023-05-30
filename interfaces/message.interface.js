import { CATEGORY_STATUS } from './category.interface.js';
import { COUPON_STATUS } from './coupon.interface.js';

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
    },
    AUTHORIZATION: {
        type: 'error',
        msg: 'Usted no cuenta con el rango de autorización, Por favor comuniquese con el Administrador.'
    },
    ARGUMENT: {
        type: 'error',
        msg: 'No esta enviando un argumento valido.'
    }
};

export const MESSAGE_SUCCESS_RESPONSE = {
    USER_WELCOME: ({ username }) => ({
        type: 'success',
        msg: `Bienvenid@ ${username}, ¿Como te encuentras el día de hoy?`
    }),
    SEND_EMAIL: {
        type: 'success',
        msg: 'Registro existoso, hemos enviado un mail con las intrucciones para que confirme su cuenta.'
    },
    WELCOME_EMAIL_VERIFIED: ({ username }) => ({
        type: 'success',
        msg: `Bienvenid@ ${username}, tu cuenta ha sido confirmada correctamente.`
    })
};

export const MESSAGE_DASHBOARD_SUCCESS_RESPONSE = {
    CREATED_CATEGORY: ({ name }) => ({
        type: 'success',
        msg: `La categoría ${name} ha sido creada correctamente.`
    }),
    UPDATED_CATEGORY: ({ name }) => ({
        type: 'success',
        msg: `La categoría ${name} ha sido actualizada correctamente.`
    }),
    TOGGLE_CATEGORY: ({ name, status }) => {
        const type =
            status === CATEGORY_STATUS.ACTIVE ? 'restaurada' : 'eliminada';

        return {
            type: 'success',
            msg: `La categoría ${name} ha sido ${type} correctamente.`
        };
    },
    CREATED_COUPON: ({ code }) => ({
        type: 'success',
        msg: `El coupon CODE ${code} ha sido creada correctamente.`
    }),
    UPDATED_COUPON: ({ code }) => ({
        type: 'success',
        msg: `El coupon ${code} ha sido actualizada correctamente.`
    }),
    TOGGLE_COUPON: ({ code, status }) => {
        const type =
            status === COUPON_STATUS.ACTIVE ? 'restaurado' : 'eliminado';

        return {
            type: 'success',
            msg: `El coupon ${code} ha sido ${type} correctamente.`
        };
    }
};

export const MESSAGE_DASHBOARD_ERROR_RESPONSE = {
    NOT_FOUND_DOCUMENT: (id) => ({
        type: 'success',
        msg: `El documento con el ID ${id} no fue encontrado.`
    }),
    EXIST_DOCUMENT: ({ id }) => ({
        type: 'success',
        msg: `El documento con el ID ${id} ya existe.`
    }),
    REQUIRED_FIELD: (field) => ({
        type: 'error',
        msg: `El campo ${field} es obligatorio.`
    })
};
