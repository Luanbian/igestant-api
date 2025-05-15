import debug from 'debug';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './services';
import * as features from './features';
import { app, startServer } from './services/express';

dayjs.extend(utc);
dayjs.extend(timezone);

const logger = debug('core:index');

logger('Starting API');

app.use(features.questionAndAnswer.controller.router);

if (require.main === module) {
    const server = startServer();

    const shutdown = () => {
        logger('Shutting down server...');
        server.close(() => {
            logger('Server shutdown complete');
            process.exit(0);
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
