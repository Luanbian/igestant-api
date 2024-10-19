import { getDb } from '../../../services';
import {
    COLLECTION_QUESTION_AND_ANSWER,
    QuestionAndAnswerDocument,
} from './schema';
import { CreateQuestionAndAnswerParams } from './types';

const questionAndAnswers = () =>
    getDb().collection<QuestionAndAnswerDocument>(
        COLLECTION_QUESTION_AND_ANSWER
    );

export const createQuestionAndAnswer = async ({
    questionAndAnswer,
}: CreateQuestionAndAnswerParams) =>
    questionAndAnswers().insertOne(questionAndAnswer);
