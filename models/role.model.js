import { Schema, model } from 'mongoose';

const roleSchema = Schema(
    {
        name: {
            type: String,
            enum: ['CUSTOMER', 'SALESMAN', 'ADMIN']
        }
    },
    {
        timestamps: true
    }
);

export const Role = model('Role', roleSchema);
