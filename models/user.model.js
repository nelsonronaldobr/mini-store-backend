import { Schema, model } from 'mongoose';
import { USER_STATUS } from '../interfaces/user.interface.js';

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
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
            enum: [
                USER_STATUS.VERIFIED,
                USER_STATUS.PENDING,
                USER_STATUS.BANNED
            ],
            default: USER_STATUS.PENDING
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
