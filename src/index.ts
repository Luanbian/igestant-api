import debug from 'debug';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './services';
import * as features from './features';
import { app } from './services/express';

dayjs.extend(utc);
dayjs.extend(timezone);

const logger = debug('core');

logger('Starting API');

app.use(features.questionAndAnswer.controller.router);

export { app };
