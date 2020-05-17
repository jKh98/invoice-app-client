import {combineReducers} from 'redux';

const getInvoices = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INVOICES_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                invoicesList: null,
            };
        case 'GET_INVOICES_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                invoicesList: action.payload,
            };
        case 'GET_INVOICES_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                invoicesList: action.payload,
            };
        default:
            return state;
    }
};

const editInvoice = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_INVOICE_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                invoice: null,
            };
        case 'EDIT_INVOICE_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                invoice: action.payload,
            };
        case 'EDIT_INVOICE_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                invoice: action.payload,
            };
        default:
            return state;
    }
};

export default combineReducers({editInvoice, getInvoices});

