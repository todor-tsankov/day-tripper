import endpoints from '../api/endpoints.js';
import { get } from '../api/api.js';

export async function getMonthlyTrips(year, month){
    return await get(endpoints.calendar + '?year=' + year + '&month=' + month);
}