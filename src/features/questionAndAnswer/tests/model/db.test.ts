import {
    startMongoTest,
    stopMongoTest,
} from '../../../../services/mongo/memoryServer';
import {
    countQuestionAndAnswers,
    createQuestionAndAnswer,
    findQuestionAndAnswers,
} from '../../model';
import { questionAndAnswersMock } from '../mocks/questionAndAnswerMock';

describe('QuestionAndAnswer Model', () => {
    beforeAll(async () => {
        await startMongoTest();
    });
    afterAll(async () => {
        await stopMongoTest();
    });

    it('should create a question and answer', async () => {
        const questionAndAnswer = questionAndAnswersMock[0];

        const result = await createQuestionAndAnswer({
            questionAndAnswer,
        });

        expect(result.acknowledged).toBe(true);
        expect(result.insertedId).toBeDefined();
    });

    it('should find question and answers', async () => {
        const query = { question: questionAndAnswersMock[0].question };
        const result = await findQuestionAndAnswers({
            query,
            limit: 1,
            skip: 0,
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should count question and answers', async () => {
        const query = { question: questionAndAnswersMock[0].question };
        const result = await countQuestionAndAnswers(query);
        expect(result).toBeGreaterThanOrEqual(0);
    });
});
