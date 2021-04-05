import endpoints from '../api/endpoints.js';
import { get } from '../api/api.js';

export async function getTrips(search) {
    let url = endpoints.trips + '?';
    const params = [];

    for (let property in search) {
        params.push(property + '=' + search[property]);
    }

    url += params.join(';');
    return await get(url);
}
