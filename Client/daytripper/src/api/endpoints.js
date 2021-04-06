export const host = 'http://localhost:5000';

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
    sectors: host + '/secotrs',
};

export default endpoints;
