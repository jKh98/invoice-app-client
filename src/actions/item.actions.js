import {fetchApi} from '../service/api';

export const getItemsList = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: 'GET_ITEMS_LOADING',
            });
            const response = await fetchApi('/item/all', 'GET', null, 200, token);
            if (response.success) {
                dispatch({
                    type: 'GET_ITEMS_SUCCESS',
                    payload: response.responseBody,
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: 'GET_ITEMS_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};

export const editItem = (payload) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: 'EDIT_ITEM_LOADING',
            });
            const response = await fetchApi('/item/edit', 'POST', payload, 200, token);

            if (response.success) {
                dispatch({
                    type: 'EDIT_ITEM_SUCCESS',
                    payload: response.responseBody,
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: 'EDIT_ITEM_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};
