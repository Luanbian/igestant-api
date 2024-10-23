import { NextFunction, Request, Response } from 'express';
import { v6 } from 'uuid';
import { APIResponse } from '../../../services/express/types';
import { schemaValidationForCreate } from './schema';

export const validateBodyForCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        req.body = schemaValidationForCreate.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            code: 'igestant.api.questionAndAnswer.validateBodyForCreate.failed',
            message: `Validation failed: ${error}`,
            transaction: v6(),
            args: error,
        } as APIResponse);
    }
};
