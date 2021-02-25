import {
    FETCH_ALL,
    FETCH_BY_ID
} from '../actions/types';

const INITIAL_STATE = {
    courses: [],
    coursesUser: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_ALL:
            return { ...state, 
                courses: action.payload.courses
            };
        case FETCH_BY_ID:
            return { ...state, 
                coursesUser: action.payload.courses
            };
        default:
            return state;
    }
}