import { QuestionAndAnswerDocument } from '../model';

export interface ResponseQuestionAndAnswerPaginated {
    data: QuestionAndAnswerDocument[];
    page: number;
    totalPage: number;
    total: number;
    limit: number;
}
