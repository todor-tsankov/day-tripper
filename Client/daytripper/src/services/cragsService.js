import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getCrags(areaId) {
    return await get(endpoints.crags + areaId ? '?areaId=' + areaId : '');
}

export async function postCrag(name, areaId, token) {
    return await post(endpoints.crags, { name, areaId }, token);
}

export async function putCrag(cragId, name, areaId, token) {
    return await put(endpoints.crags, { cragId, name, areaId }, token);
}

export async function deleteCrag(cragId, token) {
    return await del(endpoints.crags, { cragId }, token);
}