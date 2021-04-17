import endpoints from '../api/endpoints.js';
import { get, post, put, del } from '../api/api.js';

export async function getSectors(cragId) {
    return await get(endpoints.sectors + (cragId ? '?cragId=' + cragId : ''));
}

export async function postSector(name, cragId, token) {
    return await post(endpoints.sectors, { name, cragId }, token);
}

export async function putSector(sectorId, name, cragId, token) {
    return await put(endpoints.sectors, { sectorId, name, cragId }, token);
}

export async function deleteSector(sectorId, token) {
    return await del(endpoints.sectors, { sectorId }, token);
}
