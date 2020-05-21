import {fetchApi} from '../service/api';

export const registerNewUser = (payload) => {
    return async (dispatch) => {

        try {
            dispatch({
                type: 'REGISTER_USER_LOADING',
            });
            const response = await fetchApi('/user/register', 'POST', payload, 200);

            if (response.success) {
                dispatch({
                    type: 'REGISTER_USER_SUCCESS',
                });
                dispatch({
                    type: 'AUTH_USER_SUCCESS',
                    token: response.token,
                });
                dispatch({
                    type: 'GET_USER_SUCCESS',
                    payload: response.responseBody,
                });

                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: 'REGISTER_USER_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};

export const loginUser = (payload) => {
    return async (dispatch) => {

        try {
            dispatch({
                type: 'LOGIN_USER_LOADING',
            });
            const response = await fetchApi('/user/login', 'POST', payload, 200);

            if (response.success) {
                dispatch({
                    type: 'LOGIN_USER_SUCCESS',
                });
                dispatch({
                    type: 'AUTH_USER_SUCCESS',
                    token: response.token,
                });
                dispatch({
                    type: 'GET_USER_SUCCESS',
                    payload: response.responseBody,
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: 'LOGIN_USER_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};

export const getUser = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            const response = await fetchApi('/user/user', 'GET', null, 200, token);
            if (response.success) {
                dispatch({
                    type: 'GET_USER_SUCCESS',
                    payload: response.responseBody,
                });
                return response
            }else {
                throw response
            }
        } catch (error) {
            dispatch({
                type: 'GET_USER_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            console.log(token);
            const response = await fetchApi('/user/logout', 'DELETE', null, 200, token);
            console.log(response);
            dispatch({
                type: 'USER_LOGGED_OUT_SUCCESS',
            });
        } catch (e) {
            console.log(e);
        }
    };
};


// export const editUser = (payload) => {
//     return async (dispatch, getState) => {
//         const state = getState();
//         try {
//             const {authReducer: {authData: {token}}} = state;
//             const response = await fetchApi('/user/edit', 'POST', payload, 200, token);
//             if (response.success) {
//                 dispatch({
//                     type: 'EDIT_USER_SUCCESS',
//                     payload: response.responseBody,
//                 });
//                 return response;
//             } else {
//                 throw response;
//             }
//         } catch (error) {
//             dispatch({
//                 type: 'EDIT_USER_SUCCESS',
//                 payload: error.responseBody,
//             });
//             return error;
//         }
//     };
