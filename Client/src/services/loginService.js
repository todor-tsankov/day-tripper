import endpoints from '../api/endpoints.js';
import { post } from '../api/api.js';

export async function login(email, password, remeberMe) {
    return await post(endpoints.login, { email, password, remeberMe });
}