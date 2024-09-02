import * as expressModule from '.';
import { server } from './index';

describe('services index', () => {
    afterEach((done) => {
        server.close(done);
    });
    it('should export express', () => {
        expect(expressModule).toBeDefined();
    });
});
