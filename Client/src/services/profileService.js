import endpoints from '../api/endpoints.js';
import { get, put } from '../api/api.js';

export async function getUserDetails(token) {
    return await get(endpoints.profile, undefined, token);
}

export async function updateProfile(data, token) {
    return await put(endpoints.profile, data, token);
}
