import endpoints from '../api/endpoints.js';
import { get } from '../api/api.js';

export async function getTrips(search) {
    return await get(endpoints.trips, search);
}
