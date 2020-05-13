import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer', 'userReducer'],
};

const persistReducerObj = persistReducer(persistConfig, reducers);
export default () => {
    let store = createStore(persistReducerObj, {}, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {store, persistor};
}
