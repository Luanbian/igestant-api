import debug from 'debug';
import { Router } from 'express';
import { v6 } from 'uuid';
import { APIResponse } from '../../../services/express/types';

const logger = debug('features:questionAndAnswer:controller');
const route = Router();

route.get('/', async (req, res) => {
    try {
        res.json({
            code: 'igestant.api.questionAndAnswer.get.success',
            message: 'Question and answer fetched successfully',
            transaction: v6(),
        } as APIResponse);
    } catch (error) {
        logger('GET /', error);
        res.status(500).json({
            code: 'igestant.api.questionAndAnswer.get.failed',
            message: `Question and answer fetched failed: ${error}`,
            args: error,
            transaction: v6(),
        } as APIResponse);
    }
});

export { route };
