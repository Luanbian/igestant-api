import './config';

export const MONGO_URL =
    process.env.MONGO_URL || 'mongodb://root:pass@127.0.0.1/local';
export const MONGO_DB = process.env.MONGO_DB || 'Igestant';
