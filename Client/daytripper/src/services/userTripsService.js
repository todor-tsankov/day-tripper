import endpoints from '../api/endpoints.js';
import { get, post, del } from '../api/api.js';

export async function getUserTrips(tripId) {
    return await get(endpoints.userTrips + '?tripId=' + tripId);
}

export async function joinTrip(tripId, token) {
    return await post(endpoints.userTrips, { tripId }, token);
}

export async function leaveTrip(tripId, token) {
    return await del(endpoints.userTrips, { tripId }, token);
}