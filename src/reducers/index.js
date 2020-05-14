import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import {reducer as formReducer} from 'redux-form';
import sceneReducer from './scene.reducer';

const reducers = {
    authReducer,
    sceneReducer,
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
