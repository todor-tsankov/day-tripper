import endpoints from '../api/endpoints.js';
import { get } from '../api/api.js';

export async function getTrips(search) {
    const values = [];

    for (let key in search) {
        const value = search[key];

        if (value) {
            values.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    }

    return await get(endpoints.trips + '?' + values.join('&'));
}
