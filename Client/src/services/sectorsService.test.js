import { setupServer } from 'msw/node';

import { sectorsHandlers } from '../testing/handlers.js';
import { getSectors, postSector, putSector, deleteSector } from './sectorsService.js';

const server = setupServer(...sectorsHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('sectorsService tests', () => {
    it('getSectors gets the correct data', async () => {
        const { code, message, data } = await getSectors();

        expect(code).toBe(200);
        expect(message).toBe('sector get');
        expect(data.num).toBe(1);
    });

    it('postSector sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await postSector('name', 0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('sector post');
        expect(data.cragId).toBe(1);
        expect(data.name).toBe('name(valid)');
    });

    it('putSector sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await putSector(0, 'name', 0, 'token');

        console.log(message);
        
        expect(code).toBe(200);
        expect(message).toBe('sector put');
        expect(data.cragId).toBe(1);
        expect(data.sectorId).toBe(1);
        expect(data.name).toBe('name(valid)');
    });

    it('deleteSector sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await deleteSector(0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('sector delete');
        expect(data.sectorId).toBe(1);
    });
});
