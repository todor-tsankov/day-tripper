import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getTripDetails(tripId) {
    return await get(endpoints.tripDetails + '?tripId=' + tripId);
}

export async function postTrip(cragId, sectorId, leaving, returning, withCar, seats, comment, token) {
    return await post(endpoints.tripDetails, { cragId, sectorId, leaving, returning, withCar, seats, comment }, token);
}

export async function putTrip(tripId, cragId, sectorId, leaving, returning, withCar, seats, comment, token) {
    return await put(endpoints.tripDetails, { tripId, cragId, sectorId, leaving, returning, withCar, seats, comment }, token);
}

export async function deleteTrip(tripId, token) {
    return await del(endpoints.tripDetails, { tripId }, token);
}
