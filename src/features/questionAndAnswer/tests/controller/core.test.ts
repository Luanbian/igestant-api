import request from 'supertest';
import { v6 } from 'uuid';
import { Server } from 'http';
import { app } from '../../../../index';
import {
    insertQuestionAndAnswerMock,
    questionAndAnswersMock,
} from '../mocks/questionAndAnswerMock';
import { model } from '../..';
import { transactionMock } from '../mocks/transactionMock';

jest.mock('uuid', () => ({
    v6: jest.fn(),
}));
jest.mock('../../model');
export const mockModel = model as jest.Mocked<typeof model>;

describe('QuestionAndAnswer Controller', () => {
    let server: Server;
    beforeAll((done) => {
        server = app.listen(0, () => {
            done();
        });
    });
    afterAll((done) => {
        server.close(done);
    });

    it('should return 200 status code, and list some QuestionAndAnswer in APIResponse format', async () => {
        mockModel.findQuestionAndAnswers.mockResolvedValue(
            questionAndAnswersMock
        );
        mockModel.countQuestionAndAnswers.mockResolvedValue(10);
        (v6 as jest.Mock).mockReturnValue(transactionMock);

        const response = await request(app).get('/questionAndAnswer');

        const result = await mockModel.findQuestionAndAnswers({
            query: {},
            limit: 10,
            skip: 0,
        });
        const total = await mockModel.countQuestionAndAnswers({});

        expect(result).toEqual(questionAndAnswersMock);
        expect(total).toBe(10);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            code: 'igestant.api.questionAndAnswer.get.success',
            data: {
                data: result,
                limit: 10,
                page: 1,
                total: 10,
                totalPages: 1,
            },
            message: 'Question and answer fetched successfully',
            transaction: transactionMock,
        });
    });

    it('should return 500 status code and return error message in APIResponse format', async () => {
        const errorMessage = 'Error to fetch question and answer';
        mockModel.findQuestionAndAnswers.mockRejectedValue(errorMessage);
        (v6 as jest.Mock).mockReturnValue(transactionMock);

        const response = await request(app).get('/questionAndAnswer');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            code: 'igestant.api.questionAndAnswer.get.failed',
            message: `Question and answer fetched failed: ${errorMessage}`,
            args: errorMessage,
            transaction: transactionMock,
        });
    });

    it('should return 200 status code and insert a new QuestionAndAnswer in db', async () => {
        mockModel.createQuestionAndAnswer.mockResolvedValue(
            insertQuestionAndAnswerMock
        );
        (v6 as jest.Mock).mockReturnValue(transactionMock);

        const response = await request(app)
            .post('/questionAndAnswer')
            .send(questionAndAnswersMock[0]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            code: 'igestant.api.questionAndAnswer.post.success',
            message: 'Question and answer created successfully',
            data: {
                ...insertQuestionAndAnswerMock,
                insertedId:
                    insertQuestionAndAnswerMock.insertedId.toHexString(),
            },
            transaction: transactionMock,
        });
    });

    it('should return 500 status code and return error message in APIResponse format', async () => {
        const errorMessage = 'Error to create question and answer';
        mockModel.createQuestionAndAnswer.mockRejectedValue(errorMessage);
        (v6 as jest.Mock).mockReturnValue(transactionMock);

        const response = await request(app)
            .post('/questionAndAnswer')
            .send(questionAndAnswersMock[0]);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            code: 'igestant.api.questionAndAnswer.post.failed',
            message: `Question and answer creation failed: ${errorMessage}`,
            args: errorMessage,
            transaction: transactionMock,
        });
    });
});
