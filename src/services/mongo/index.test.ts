import { client, status, getDb, connect } from '.';

describe('Mongo service', () => {
    let connection: any;

    beforeAll(async () => {
        connection = await client.connect();
    });
    afterAll(async () => {
        await connection.close();
    });
    it('should connect to MongoDB', async () => {
        expect(connection).toBeDefined();
    });
    it('should return a db object', async () => {
        const dbObject = getDb();
        expect(dbObject).toBeDefined();
    });
    it('should fail if error connecting to MongoDB', async () => {
        jest.spyOn(client, 'connect').mockImplementationOnce(async () => {
            throw new Error('Connection failed');
        });

        await expect(connect()).rejects.toThrow('Connection failed');
    });
    it('should throw an error if getDb is called without a connection', () => {
        status.db = null;
        expect(() => getDb()).toThrow('MongoDB not connected');
    });
});
