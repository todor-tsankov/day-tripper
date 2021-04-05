import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getAreas() {
    return await get(endpoints.areas);
}

export async function postArea(name) {
    return await post(endpoints.areas, { name });
}

export async function putArea(areaId, name) {
    return await put(endpoints.areas, { areaId, name });
}

export async function deleteArea(areaId) {
    return await del(endpoints.areas, { areaId });
}
