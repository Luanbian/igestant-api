import debug from 'debug';
import { Router } from 'express';
import { v6 } from 'uuid';
import { APIResponse } from '../../../services/express/types';
import { validateBodyForCreate } from './rules';
import { model } from '..';

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
        logger('Reader Question and Answer failed: %0', error);
        res.status(500).json({
            code: 'igestant.api.questionAndAnswer.get.failed',
            message: `Question and answer fetched failed: ${error}`,
            args: error,
            transaction: v6(),
        } as APIResponse);
    }
});

route.post('/', validateBodyForCreate, async (req, res) => {
    try {
        const result = await model.createQuestionAndAnswer({
            questionAndAnswer: {
                ...req.body,
            },
        });

        res.json({
            code: 'igestant.api.questionAndAnswer.post.success',
            message: 'Question and answer created successfully',
            data: result,
            transaction: v6(),
        } as APIResponse);
    } catch (error) {
        logger('Create question and answer failed: %0', error);
        res.status(500).json({
            code: 'igestant.api.questionAndAnswer.post.failed',
            message: `Question and answer creation failed: ${error}`,
            args: error,
            transaction: v6(),
        } as APIResponse);
    }
});
export { route };
