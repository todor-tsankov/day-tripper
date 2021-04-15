import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getAreas() {
    return await get(endpoints.areas);
}

export async function postArea(name, token) {
    return await post(endpoints.areas, { name }, token);
}

export async function putArea(areaId, name, token) {
    return await put(endpoints.areas, { areaId, name }, token);
}

export async function deleteArea(areaId, token) {
    return await del(endpoints.areas, { areaId }, token);
}
