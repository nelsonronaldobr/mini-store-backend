import mongoose from 'mongoose';

/* -------------------------------------------------------------------------- */
/*                                CONNECTION DB                               */
/* -------------------------------------------------------------------------- */

export const connectDB = async () => {
    try {
        const cnx = await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`DB conectada en ${cnx.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
};
