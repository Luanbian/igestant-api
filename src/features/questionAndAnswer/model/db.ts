import { getDb } from '../../../services';
import {
    COLLECTION_QUESTION_AND_ANSWER,
    QuestionAndAnswerDocument,
} from './schema';
import {
    CreateQuestionAndAnswerParams,
    FindQuestionAndAnswersParams,
} from './types';

const questionAndAnswers = () =>
    getDb().collection<QuestionAndAnswerDocument>(
        COLLECTION_QUESTION_AND_ANSWER
    );

export const createQuestionAndAnswer = async ({
    questionAndAnswer,
}: CreateQuestionAndAnswerParams) =>
    questionAndAnswers().insertOne(questionAndAnswer);

export const findQuestionAndAnswers = async ({
    query,
    limit,
    skip,
}: FindQuestionAndAnswersParams) =>
    questionAndAnswers()
        .aggregate([{ $match: query }, { $skip: skip }, { $limit: limit }])
        .toArray();

export const countQuestionAndAnswers = async (query: any) =>
    questionAndAnswers().countDocuments(query);
