import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

const startMongoTest = async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    client = new MongoClient(mongoUri);
    await client.connect();
};

const stopMongoTest = async () => {
    await client.close();
    await mongoServer.stop();
};

export { startMongoTest, stopMongoTest };
