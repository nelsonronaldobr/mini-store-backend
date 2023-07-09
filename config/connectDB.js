import mongoose from 'mongoose';
import { getEnvVariable } from '../helpers/getEnvVariable.js';

const { MONGO_DB } = getEnvVariable();

/* -------------------------------------------------------------------------- */
/*                                CONNECTION DB                               */
/* -------------------------------------------------------------------------- */

export const connectDB = async () => {
    try {
        const cnx = await mongoose.connect(MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`DB conectada en ${cnx.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
};
