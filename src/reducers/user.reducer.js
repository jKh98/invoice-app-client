import {combineReducers} from 'redux';

const getUser = (state = {}, action) => {
    switch (action.type) {
        case 'GET_USER_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userDetails: null,
            };
        case 'GET_USER_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userDetails: action.payload,
            };
        case 'GET_USER_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userDetails: action.payload,
            };
        default:
            return state;
    }
};

const editUser = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_USER_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null,
            };
        case 'EDIT_USER_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
            };
        case 'EDIT_USER_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload,
            };
        default:
            return state;
    }
};


export default combineReducers({getUser, editUser});
