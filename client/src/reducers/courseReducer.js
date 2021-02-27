import {
    FETCH_COURSE,
    FETCH_COURSES,
    UPDATE_LAST_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
    courses: [],
    selectedCourse: {},
    lastChange: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_COURSES:
            return { ...state, courses: action.payload };
        case FETCH_COURSE:
            return { ...state, selectedCourse: action.payload };
        case UPDATE_LAST_CHANGE:
            return { ...state, lastChange: action.payload }
        default:
            return state;
    }
}