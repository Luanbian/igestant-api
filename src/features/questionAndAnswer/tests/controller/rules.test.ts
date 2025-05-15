import { Server } from 'http';
import request from 'supertest';
import { app } from '../../../../services';
import { questionAndAnswersMock } from '../mocks/questionAndAnswerMock';

describe('QuestionAndAnswer Controller Rules Validation', () => {
    let server: Server;
    beforeAll((done) => {
        server = app.listen(0, () => {
            done();
        });
    });
    afterAll((done) => {
        server.close(done);
    });

    it('should return 400 status code, and validation error message in APIResponse format', async () => {
        const wrongBody = {
            ...questionAndAnswersMock[0],
            question: null, // question is required
        };

        const response = await request(app)
            .post('/questionAndAnswer')
            .send(wrongBody);

        // TODO: validate the response body
        expect(response.status).toBe(400);
    });
});
