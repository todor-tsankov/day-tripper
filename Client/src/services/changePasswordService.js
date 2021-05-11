import endpoints from '../api/endpoints.js';
import { post } from '../api/api.js';

export async function changePassword(data, token){
    console.log(data);
    console.log(token);
    return await post(endpoints.changePassword, data, token);
}