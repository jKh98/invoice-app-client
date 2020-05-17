import {fetchApi} from '../service/api';

export const getCustomersList = () => {
    return async (dispatch,getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: "GET_CUSTOMERS_LOADING"
            });
            const response = await fetchApi("/customer/all", "GET", null, 200,token);

            if(response.success) {
                dispatch({
                    type: "GET_CUSTOMERS_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "GET_CUSTOMERS_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

export const editCustomer = (payload) => {
    return async (dispatch,getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: "EDIT_CUSTOMER_LOADING"
            });
            const response = await fetchApi("/customer/edit", "POST", payload, 200,token);

            if(response.success) {
                dispatch({
                    type: "EDIT_CUSTOMER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "EDIT_CUSTOMER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}
