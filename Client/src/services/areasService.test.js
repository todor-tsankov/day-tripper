import { setupServer } from 'msw/node';

import { apiHandlers } from '../testing/handlers.js';
import { getAreas, postArea, putArea, deleteArea } from './areasService';

const server = setupServer(...apiHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('areasService tests', () => {
    it('getAreas gets the correct data', async () => {
        const { code, message, data } = await getAreas();

        expect(code).toBe(200);
        expect(message).toBe();
        expect(data.num).toBe(1);
    });

    it('postArea psends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await postArea('name', 'token');

        expect(code).toBe(200);
        expect(message).toBe('area post');
        expect(data.name).toBe('name(valid)');
    });
});
