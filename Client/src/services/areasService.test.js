import { setupServer } from 'msw/node';

import { areasHandlers } from '../testing/handlers.js';
import { getAreas, postArea, putArea, deleteArea } from './areasService.js';

const server = setupServer(...areasHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('areasService tests', () => {
    it('getAreas gets the correct data', async () => {
        const { code, message, data } = await getAreas();

        expect(code).toBe(200);
        expect(message).toBe('area get');
        expect(data.num).toBe(1);
    });

    it('postArea sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await postArea('name', 'token');

        expect(code).toBe(200);
        expect(message).toBe('area post');
        expect(data.name).toBe('name(valid)');
    });

    it('putArea sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await putArea(0, 'name', 'token');

        expect(code).toBe(200);
        expect(message).toBe('area put');
        expect(data.areaId).toBe(1);
        expect(data.name).toBe('name(valid)');
    });

    it('deleteArea sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await deleteArea(0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('area delete');
        expect(data.areaId).toBe(1);
    });
});
