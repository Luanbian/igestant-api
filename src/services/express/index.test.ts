import request from 'supertest';
import { Server } from 'http';
import { app } from '../../index';

let server: Server;
describe('Health Check', () => {
    beforeAll((done) => {
        server = app.listen(0, () => {
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
