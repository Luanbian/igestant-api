import { z } from 'zod';
import { ObjectId } from '../../../services/mongo';

export const COLLECTION_QUESTION_AND_ANSWER = 'questionAndAnswer';

export const questionAndAnswerSchema = z.object({
    question: z.string(),
    answer: z.object({
        long: z.string(),
        short: z.string(),
    }),
    thumbnail: z.string(),
    reference: z.string(),
});

export type QuestionAndAnswer = z.infer<typeof questionAndAnswerSchema>;
export type QuestionAndAnswerDocument = QuestionAndAnswer & {
    _id?: string | ObjectId;
};
