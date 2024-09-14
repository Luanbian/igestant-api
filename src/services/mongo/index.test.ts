/* eslint-disable global-require */
import { client, connect, getDb, status } from '.';

describe('MongoDB Service', () => {
    afterAll(async () => {
        await client.close();
    });
    it('should connect to MongoDB', async () => {
        await connect();
        expect(client).toBeDefined();
    });
    it('should throw an error if not connected to MongoDB', async () => {
        status.db = null;
        expect(() => getDb()).toThrow('MongoDB not connected');
    });
    it('should return the database object', async () => {
        status.db = client.db();
        expect(getDb()).toBeDefined();
    });
});
