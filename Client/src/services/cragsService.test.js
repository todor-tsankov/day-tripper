import { setupServer } from 'msw/node';

import { cragsHandlers } from '../testing/handlers.js';
import { getCrags, postCrag, putCrag, deleteCrag } from './cragsService.js';

const server = setupServer(...cragsHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('cragsService tests', () => {
    it('getCrags gets the correct data', async () => {
        const { code, message, data } = await getCrags();

        expect(code).toBe(200);
        expect(message).toBe('crag get');
        expect(data.num).toBe(1);
    });

    it('postCrag sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await postCrag('name', 0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('crag post');
        expect(data.areaId).toBe(1);
        expect(data.name).toBe('name(valid)');
    });

    it('putCrag sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await putCrag(0, 'name', 0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('crag put');
        expect(data.cragId).toBe(1);
        expect(data.areaId).toBe(1);
        expect(data.name).toBe('name(valid)');
    });

    it('deleteCrag sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await deleteCrag(0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('crag delete');
        expect(data.cragId).toBe(1);
    });
});
