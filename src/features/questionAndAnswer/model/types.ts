import { QuestionAndAnswerDocument } from './schema';

export interface CreateQuestionAndAnswerParams {
    questionAndAnswer: QuestionAndAnswerDocument;
}

export interface FindQuestionAndAnswersParams {
    query: any;
    skip: number;
    limit: number;
}
