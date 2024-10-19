import debug from 'debug';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { MONGO_DB, MONGO_URL } from '../../constants/mongo';

const logger = debug('services:mongo');
const client = new MongoClient(MONGO_URL);

const status: {
    db: Db | null;
} = {
    db: null,
};

const connect = async () => {
    try {
        logger('Connecting to MongoDB in %0', MONGO_URL);
        await client.connect();
        status.db = client.db(MONGO_DB);
        logger('Connected to MongoDB');
    } catch (err) {
        logger('Error connecting to MongoDB: %0', err);
        throw new Error(`Error connecting to MongoDB ${err}`);
    }
};

connect();

const getDb = () => {
    if (!status.db) {
        throw new Error('MongoDB not connected');
    }
    return status.db;
};

export { getDb, client, connect, status, ObjectId };
