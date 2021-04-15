async function request(url, options) {
    const result = {};

    try {
        const response = await fetch(url, options);
        result.code = response.status;;

        try {
            const resultObj = await response.json();

            result.data = resultObj.data;
            result.message = resultObj.message;
        } catch (e) {
            result.message = await response.text();
        }
    } catch (err) {
        result.message = 'Error connecting to the server, please check your connection and try again...';
    }

    return result;
}

function getOptions(method = 'get', body, token) {
    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
    }

    return options;
}

export async function get(url, data, token) {
    return await request(url, getOptions('get', data, token));
}

export async function post(url, data, token) {
    const options = getOptions('post', data, token);
    return await request(url, options);
}

export async function put(url, data, token) {
    return await request(url, getOptions('put', data, token));
}

export async function del(url, data, token) {
    return await request(url, getOptions('delete', data, token));
}
