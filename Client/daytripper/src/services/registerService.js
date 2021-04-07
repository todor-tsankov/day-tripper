import endpoints from '../api/endpoints.js';
import { post } from '../api/api.js';

export async function register(data) {
    return await post(endpoints.register, data );
}