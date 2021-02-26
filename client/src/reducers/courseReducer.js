import {
    FETCH_COURSE,
    FETCH_COURSES,
    FETCH_COURSES_BY_ID
} from '../actions/types';

const INITIAL_STATE = {
    courses: [],
    coursesUser: [],
    selectedCourse: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_COURSES:
            return { ...state, courses: action.payload };
        case FETCH_COURSES_BY_ID:
            return { ...state, coursesUser: action.payload };
        case FETCH_COURSE:
            return { ...state, selectedCourse: action.payload };
        default:
            return state;
    }
}