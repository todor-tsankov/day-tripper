import endpoints from '../api/endpoints.js';
import { get, post, del } from '../api/api.js';

export async function getUserTrips(tripId) {
    return await get(endpoints.userTrips);
}

export async function joinTrip(tripId) {
    return await post(endpoints.userTrips, { tripId });
}

export async function leaveTrip(tripId) {
    return await del(endpoints.userTrips, { tripId });
}