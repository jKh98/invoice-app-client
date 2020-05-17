import {combineReducers} from 'redux';

const getItems = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ITEMS_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                itemsList: null,
            };
        case 'GET_ITEMS_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                itemsList: action.payload,
            };
        case 'GET_ITEMS_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                itemsList: action.payload,
            };
        default:
            return state;
    }
};

const editItem = (state={}, action) => {
    switch (action.type) {
        case 'EDIT_ITEM_LOADING':
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                item: null,
            };
        case 'EDIT_ITEM_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                item: action.payload,
            };
        case 'EDIT_ITEM_FAIL':
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                item: action.payload,
            };
        default:
            return state;
    }
}

export default combineReducers({editItem, getItems});

