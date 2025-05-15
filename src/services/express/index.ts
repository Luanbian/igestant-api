import debug from 'debug';
import express from 'express';
import cors from 'cors';
import os from 'os';
import dayjs from 'dayjs';
import { v6 } from 'uuid';
import pkgJson from '../../../package.json';
import { APIEcho, APIResponse } from './types';
import { EXPRESS_PORT } from '../../constants/express';

const logger = debug('services:express');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.status(200).json({
        code: 'echo',
        transaction: v6(),
        message: 'Ok',
        args: [],
        data: {
            server: os.hostname(),
            time: dayjs().toISOString(),
            version: pkgJson.version,
        },
    } as APIResponse<APIEcho>);
});

const startServer = () =>
    app.listen(EXPRESS_PORT, () => {
        logger(`Server started on port ${EXPRESS_PORT}`);
    });

export { app, startServer };
