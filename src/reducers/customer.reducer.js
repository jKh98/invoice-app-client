import {combineReducers} from 'redux';

const getCustomers = (state = {}, action) => {
    switch (action.type) {
        case 'GET_CUSTOMERS_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                customersList: null,
            };
        case 'GET_CUSTOMERS_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                customersList: action.payload,
            };
        case 'GET_CUSTOMERS_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                customersList: action.payload,
            };
        default:
            return state;
    }
};

export default combineReducers({getCustomers});
