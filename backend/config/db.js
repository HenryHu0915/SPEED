/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import * as config from 'config';

const isLocal = true;
const db = isLocal ? config.get('mongoURI') : process.env.MONGODB_URI;


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            dbName: "Speed"
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

let dbInstance = null;
export async function connectToDatabase() {
    if(dbInstance) {
        return dbInstance;
    }

    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(db, {
        useNewUrlParser: true,
        dbName: "Speed"
    });
    dbInstance = connection;
    return dbInstance;
}

module.exports = { connectDB, connectToDatabase };