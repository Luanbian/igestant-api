import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export const questionAndAnswersMock = [
    {
        question: `${faker.lorem.sentence()}?`,
        answer: {
            long: faker.lorem.paragraph(),
            short: faker.lorem.sentence(),
        },
        thumbnail: faker.image.url(),
        reference: faker.person.fullName(),
        ageRange: faker.helpers.arrayElement(['0-5', '6-12', '13-18']),
        categories: [
            faker.helpers.arrayElement(['health', 'education', 'tips']),
        ],
        gender: faker.helpers.arrayElement(['female', 'male', 'both']),
    },
    {
        question: `${faker.lorem.sentence()}?`,
        answer: {
            long: faker.lorem.paragraph(),
            short: faker.lorem.sentence(),
        },
        thumbnail: faker.image.url(),
        reference: faker.person.fullName(),
        ageRange: faker.helpers.arrayElement(['0-5', '6-12', '13-18']),
        categories: [
            faker.helpers.arrayElement(['health', 'education', 'tips']),
        ],
        gender: faker.helpers.arrayElement(['female', 'male', 'both']),
    },
];

export const insertQuestionAndAnswerMock = {
    acknowledged: true,
    insertedId: new ObjectId(),
};
