import { rest } from 'msw';
import endpoints from '../api/endpoints.js';

const apiHandlers = [
    rest.get('/text', async (req, res, ctx) => {
        return res(ctx.text('text response'));
    }),

    rest.post('/code', async (req, res, ctx) => {
        return res(ctx.json({}), ctx.status(201));
    }),

    rest.put('/message', async (req, res, ctx) => {
        return res(ctx.json({ message: 'message' }));
    }),

    rest.post('/data', async (req, res, ctx) => {
        const data = req.body;
        data.num++;

        return res(ctx.json({ data: data }));
    }),
];

const citiesHandlers = [
    rest.get(endpoints.cities, async (req, res, ctx) => {
        return res(ctx.json({ message: 'citest get', data: { num: 1 } }));
    }),

    rest.post(endpoints.cities, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'citest post', data: { ...data } }));
    }),

    rest.put(endpoints.cities, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'citest put', data: { ...data } }));
    }),

    rest.delete(endpoints.cities, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'citest delete', data: { ...data } }));
    }),
];
const areasHandlers = [
    rest.get(endpoints.areas, async (req, res, ctx) => {
        return res(ctx.json({ message: 'area get', data: { num: 1 } }));
    }),

    rest.post(endpoints.areas, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.name += '(valid)';

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'area post', data: { ...data } }));
    }),

    rest.put(endpoints.areas, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'area put', data: { ...data } }));
    }),

    rest.delete(endpoints.areas, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'area delete', data: { ...data } }));
    }),
];

const cragsHandlers = [
    rest.get(endpoints.crags, async (req, res, ctx) => {
        return res(ctx.json({ message: 'crag get', data: { num: 1 } }));
    }),

    rest.post(endpoints.crags, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'crag post', data: { ...data } }));
    }),

    rest.put(endpoints.crags, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'crag put', data: { ...data } }));
    }),

    rest.delete(endpoints.crags, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'crag delete', data: { ...data } }));
    }),
];

const sectorsHandlers = [
    rest.get(endpoints.sectors, async (req, res, ctx) => {
        return res(ctx.json({ message: 'sector get', data: { num: 1 } }));
    }),

    rest.post(endpoints.sectors, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'sector post', data: { ...data } }));
    }),

    rest.put(endpoints.sectors, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'sector put', data: { ...data } }));
    }),

    rest.delete(endpoints.sectors, async (req, res, ctx) => {
        const bearer = req.headers['Authorization'];
        const data = req.data;
        data.num++;

        if (bearer !== 'Bearer token') {
            return res(ctx.status(403));
        }

        return res(ctx.json({ message: 'sector delete', data: { ...data } }));
    }),
];

const followsHandlers = [];
const calendarHandlers = [];
const registerHandlers = [];
const profileHandlers = [];
const tripsHandlers = [];
const userTripsHandlers = [];
const tripDetailsHandlers = [];
const loginHandlers = [];

export {
    apiHandlers,
    loginHandlers,
    registerHandlers,
    profileHandlers,
    tripsHandlers,
    tripDetailsHandlers,
    userTripsHandlers,
    citiesHandlers,
    cragsHandlers, sectorsHandlers,
    areasHandlers,
    followsHandlers,
    calendarHandlers,
};