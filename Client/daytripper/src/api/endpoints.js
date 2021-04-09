//export const host = 'https://localhost:44397';
export const host = 'https://localhost:5001';

const endpoints = {
    login: host + '/login',
    register: host + '/register',
    profile: host + '/profile',
    trips: host + '/trips',
    userTrips: host + '/userTrips',
    tripDetails: host + '/tripDetails',
    cities: host + '/cities',
    areas: host + '/areas',
    crags: host + '/crags',
    sectors: host + '/sectors',
    follows: host + '/follows',
};

export default endpoints;
