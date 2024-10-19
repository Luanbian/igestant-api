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
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const query = {};

        const result = await model.findQuestionAndAnswers({
            query,
            skip: (page - 1) * limit,
            limit,
        });

        const total = await model.countQuestionAndAnswers(query);
        const totalPages = Math.ceil(total / limit);

        res.json({
            code: 'igestant.api.questionAndAnswer.get.success',
            message: 'Question and answer fetched successfully',
            transaction: v6(),
            data: {
                data: result,
                page,
                limit,
                total,
                totalPages,
            },
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
