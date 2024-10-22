import { faker } from '@faker-js/faker';

export const questionAndAnswersMock = [
    {
        question: `${faker.lorem.sentence()}?`,
        answer: {
            long: faker.lorem.paragraph(),
            short: faker.lorem.sentence(),
        },
        thumbnail: faker.image.url(),
        reference: faker.person.fullName(),
    },
    {
        question: `${faker.lorem.sentence()}?`,
        answer: {
            long: faker.lorem.paragraph(),
            short: faker.lorem.sentence(),
        },
        thumbnail: faker.image.url(),
        reference: faker.person.fullName(),
    },
];
