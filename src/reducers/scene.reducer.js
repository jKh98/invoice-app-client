import {ActionConst} from 'react-native-router-flux';

const sceneReducer = (state = {}, {type, scene}) => {
    switch (type) {
        case ActionConst.FOCUS:
            return {...state, scene};
        default:
            return state;
    }
};

export default sceneReducer;
