async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
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

    if(token){
        options.headers['Authorization'] = 'Bearer ' +  token;
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
