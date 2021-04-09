import endpoints from '../api/endpoints.js';
import { get, post, del } from '../api/api.js';

export async function getIsFollower(userId, token) {
    return await get(endpoints.follows + '?userId=' + userId, undefined, token);
}

export async function postFollow(followedId, token) {
    return await post(endpoints.follows, { followedId }, token);
}

export async function deleteFollow(userId, token) {
    return await del(endpoints.follows, { userId }, token);
}