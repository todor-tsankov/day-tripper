import { setupServer } from 'msw/node';

import { apiHandlers } from '../testing/handlers.js';
import { request, getOptions } from './api.js';

const server = setupServer(...apiHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('request tests', () => {
    it('returns only message on failed fetch', async () => {
        const result = await request('/invalid', { method: 'get' });

        expect(result.code).toBeUndefined();
        expect(result.data).toBeUndefined();
        expect(result.message).toBe('Error connecting to the server, please check your connection and try again...');
    });

    it('returns only message if the response is text', async () => {
        const result = await request('/text', { method: 'get' });

        expect(result.data).toBeUndefined();
        expect(result.code).toBe(200);
    });

    it('returns correct code', async () => {
        const result = await request('/code', { method: 'post', body: {} });
        expect(result.code).toBe(201);
    });

    it('returns correct message', async () => {
        const result = await request('/message', { method: 'put', body: {} });
        expect(result.message).toBe('message');
    });

    it('sends the correct data', async () => {
        const result = await request('/data', { method: 'post', body: { num: 0 }, headers: {'Content-Type': 'application/json'}});
        expect(result.data.num).toBe(1);
    });
});

describe('get options tests', () => {
    it('sets the request method by default', () => {
        const options = getOptions();
        expect(options.method).toBe('get');
    });

    it('sets the request method', () => {
        const options = getOptions('post');
        expect(options.method).toBe('post');
    });

    it('sets the body and content type header', () => {
        const options = getOptions('put', { prop: 1 });

        expect(options.body).toBe('{"prop":1}');
        expect(options.headers['Content-Type']).toBe('application/json');
    });

    it('sets the token header', () => {
        const options = getOptions('delete', undefined, '123');
        expect(options.headers['Authorization']).toBe('Bearer 123');
    });
});
