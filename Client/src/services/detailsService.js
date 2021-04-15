import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getTripDetails(tripId) {
    return await get(endpoints.tripDetails + '?tripId=' + tripId);
}

export async function postTrip(data, token) {
    return await post(endpoints.tripDetails, data, token);
}

export async function putTrip(data, token) {
    return await put(endpoints.tripDetails, data, token);
}

export async function deleteTrip(tripId, token) {
    return await del(endpoints.tripDetails, { tripId }, token);
}
