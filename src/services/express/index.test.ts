import request from 'supertest';
import { app, server } from '.';

describe('Health Check', () => {
    afterEach((done) => {
        server.close(done);
    });
    it('should return status 200 and code echo', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.code).toBe('echo');
    });
});
