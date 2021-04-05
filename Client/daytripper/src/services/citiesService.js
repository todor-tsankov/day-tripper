import endpoints from '../api/endpoints.js';
import {get, post, put, del} from '../api/api.js';

export async function getCities() {
    return await get(endpoints.cities);
}

export async function postCity(name) {
    return await post(endpoints.cities, { name });
}

export async function putCity(cityId, name) {
    return await put(endpoints.cities, { cityId, name });
}

export async function deleteCity(areaId) {
    return await del(endpoints.cities, { areaId });
}