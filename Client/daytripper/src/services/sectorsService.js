import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getSectors(cragId) {
    return await get(endpoints.sectors + cragId ? '?cragId=' + cragId : '');
}

export async function postSector(name, cragId) {
    return await post(endpoints.crags, { name, cragId });
}

export async function putSector(sectorId, name, cragId) {
    return await put(endpoints.crags, { sectorId, name, cragId });
}

export async function deleteSector(sectorId) {
    return await del(endpoints.sectors, { sectorId });
}
