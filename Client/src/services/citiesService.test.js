import { setupServer } from 'msw/node';

import { citiesHandlers } from '../testing/handlers.js';
import { getCities, postCity, putCity, deleteCity } from './citiesService.js';

const server = setupServer(...citiesHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('citiesService tests', () => {
    it('getCities gets the correct data', async () => {
        const { code, message, data } = await getCities();

        expect(code).toBe(200);
        expect(message).toBe('city get');
        expect(data.num).toBe(1);
    });

    it('postCity sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await postCity('name', 'token');

        expect(code).toBe(200);
        expect(message).toBe('city post');
        expect(data.name).toBe('name(valid)');
    });

    it('putCity sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await putCity(0, 'name', 'token');

        expect(code).toBe(200);
        expect(message).toBe('city put');
        expect(data.cityId).toBe(1);
        expect(data.name).toBe('name(valid)');
    });

    it('deleteCity sends the correct data and bearer and returns correct message', async () => {
        const { code, message, data } = await deleteCity(0, 'token');

        expect(code).toBe(200);
        expect(message).toBe('city delete');
        expect(data.cityId).toBe(1);
    });
});
