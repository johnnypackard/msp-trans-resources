import { combineReducers } from 'redux';

const businesses = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_BUSINESSES':
            return [...action.payload]
        default:
            return state;
    }
};

export default combineReducers({
    businesses,
});