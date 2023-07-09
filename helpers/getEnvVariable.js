import { config } from 'dotenv';

config();

export const getEnvVariable = () => {
    return {
        PORT: process.env.PORT,
        MONGO_DB: process.env.MONGO_DB,
        JWT_SECRET: process.env.JWT_SECRET,
        CLD_CLOUD_NAME: process.env.CLD_CLOUD_NAME,
        CLD_API_KEY: process.env.CLD_API_KEY,
        CLD_API_SECRET: process.env.CLD_API_SECRET,
        FRONTEND_URL: process.env.FRONTEND_URL
    };
};
