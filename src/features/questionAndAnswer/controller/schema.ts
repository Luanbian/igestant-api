import { z } from 'zod';

export const schemaValidationForCreate = z.object({
    question: z.string(),
    answer: z.object({
        long: z.string(),
        short: z.string(),
    }),
    thumbnail: z.string(),
    reference: z.string(),
    createdAt: z.string().optional().default(new Date().toISOString()),
});
