import { Schema, model } from 'mongoose';

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email_verified: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ['VERIFICADO', 'PENDIENTE', 'BANEADO'],
            default: 'PENDIENTE'
        },
        token: {
            type: String
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        },
        photo_url: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const User = model('User', userSchema);
