/* eslint-disable global-require */
import debug from 'debug';
import { server } from './services/index';

jest.mock('debug');

describe('index.ts', () => {
    beforeEach((done) => {
        server.close(done);
    });

    it('should initialize app and log Stating API', () => {
        const loggerMock = jest.fn();
        const debugMock = jest.fn(() => loggerMock);
        (debug as unknown as jest.Mock).mockImplementation(debugMock);

        require('./index');

        expect(debugMock).toHaveBeenCalledWith('core');
        expect(loggerMock).toHaveBeenCalledWith('Starting API');
    });
});
