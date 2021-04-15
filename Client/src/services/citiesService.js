import endpoints from '../api/endpoints.js';
import {get, post, put, del} from '../api/api.js';

export async function getCities() {
    return await get(endpoints.cities);
}

export async function postCity(name, token) {
    return await post(endpoints.cities, { name }, token);
}

export async function putCity(cityId, name, token) {
    return await put(endpoints.cities, { cityId, name }, token);
}

export async function deleteCity(areaId, token) {
    return await del(endpoints.cities, { areaId }, token);
}