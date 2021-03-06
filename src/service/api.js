/**
 * @todo
 * Change this url based on server ip address
 * @type {string}
 */
const BASE_URL = 'http://192.168.1.2:3333';

/**
 * Basic API function that handles sending all application requests
 *
 * @param url
 * @param method
 * @param body
 * @param headers
 * @returns {Promise<unknown>}
 */
export const api = async (url, method, body = null, headers = {}) => {
    try {
        const endPoint = BASE_URL.concat(url);
        const requestBody = body ? JSON.stringify(body) : null;
        const fetchParams = {method, headers};

        if ((method === 'POST' || method === 'PUT') && !requestBody) {
            throw new Error('Request body requires');
        }

        if (requestBody) {
            fetchParams.headers['Content-type'] = 'application/json';
            fetchParams.body = requestBody;
        }

        const fetchPromise = fetch(endPoint, fetchParams);
        const timeOutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Request Timeout');
            }, 5000);
        });

        return await Promise.race([fetchPromise, timeOutPromise]);
    } catch (e) {
        throw new Error(e);
    }
};

/**
 * Function that constructs api requests and calls api function
 *
 * @param url
 * @param method
 * @param body
 * @param statusCode
 * @param token
 * @param loader
 * @param promiseReturnType
 * @returns {Promise<{responseBody: null, success: boolean, token: null}>}
 */
export const fetchApi = async (url,
                               method,
                               body,
                               statusCode,
                               token = null,
                               loader = false,
                               promiseReturnType = 'json') => {
    try {
        const headers = {};
        const result = {
            token: null,
            success: false,
            responseBody: null,
        };

        if (token) {
            headers['x-auth'] = token;
        }

        const response = await api(url, method, body, headers);
        if (response.status === statusCode) {
            result.success = true;
            if (response.headers.get('x-auth')) {
                result.token = response.headers.get('x-auth');
            }
            let responseBody;
            const responseText = await response.text();
            try {
                responseBody = await JSON.parse(responseText);
            } catch (e) {
                responseBody = responseText;
            }
            result.responseBody = responseBody;
            return result;
        }
        let errorBody;
        const errorText = await response.text();
        try {
            errorBody = JSON.parse(errorText);
        } catch (e) {
            errorBody = errorText.toString();
        }
        result.responseBody = errorBody;
        throw result;
    } catch (error) {
        throw error;
    }
};


