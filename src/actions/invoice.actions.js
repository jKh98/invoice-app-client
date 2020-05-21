import {fetchApi} from '../service/api';

export const getInvoicesList = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: 'GET_INVOICES_LOADING',
            });
            const response = await fetchApi('/invoice/all', 'GET', null, 200, token);

            if (response.success) {
                dispatch({
                    type: 'GET_INVOICES_SUCCESS',
                    payload: response.responseBody,
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: 'GET_INVOICES_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};

export const editInvoice = (payload) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: 'EDIT_INVOICE_LOADING',
            });
            const response = await fetchApi('/invoice/edit', 'POST', payload, 200, token);

            if (response.success) {
                dispatch({
                    type: 'EDIT_INVOICE_SUCCESS',
                    payload: response.responseBody,
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: 'EDIT_INVOICE_FAIL',
                payload: error.responseBody,
            });
            return error;
        }
    };
};

export const sendInvoiceByEmail = (payload) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: 'SEND_INVOICE_EMAIL_LOADING',
            });
            const paymentSessionResponse = await fetchApi('/payment/new', 'POST', payload, 200, token);
            if (paymentSessionResponse.success) {
                console.log(paymentSessionResponse);
                const emailResponse = await fetchApi('/invoice/send', 'POST',
                    paymentSessionResponse.responseBody.value, 200, token);
                if (emailResponse.success) {
                    console.log(emailResponse);
                    dispatch({
                        type: 'SEND_INVOICE_EMAIL_SUCCESS',
                        payload: emailResponse.responseBody,
                    });
                    return emailResponse;
                } else {
                    throw emailResponse;
                }
            } else {
                throw paymentSessionResponse;
            }
        } catch (error) {
            dispatch({
                type: 'SEND_INVOICE_EMAIL_FAIL',
                payload: error.responseBody,
            });
            console.log(error);
            return error;
        }
    };
};

