import { Router } from 'express';
import { route as coreRouter } from './core';

const router = Router();

router.use('/questionAndAnswer', coreRouter);

export { router };
