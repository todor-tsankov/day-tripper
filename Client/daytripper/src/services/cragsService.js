import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getCrags(areaId) {
    return await get(endpoints.crags + areaId ? '?areaId=' + areaId : '');
}

export async function postCrag(name, areaId) {
    return await post(endpoints.crags, { name, areaId });
}

export async function putCrag(cragId, name, areaId) {
    return await put(endpoints.crags, { cragId, name, areaId });
}

export async function deleteCrag(cragId) {
    return await del(endpoints.crags, { cragId });
}