import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import itemReducer from './item.reducer';
import customerReducer from './customer.reducer';
import {reducer as formReducer} from 'redux-form';

const reducers = {
    authReducer,
    userReducer,
    customerReducer,
    itemReducer,
    form: formReducer,
};

const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT_SUCCESS') {
        state = {};
    }
    return appReducer(state, action);
};

export default rootReducer;
