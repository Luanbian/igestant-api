import request from 'supertest';
import { Server } from 'http';
import { EXPRESS_PORT } from '../../constants/express';
import { app } from '.';

let server: Server;
describe('Health Check', () => {
    beforeAll((done) => {
        server = app.listen(EXPRESS_PORT, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return status 200 and code echo', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.code).toBe('echo');
    });
});
