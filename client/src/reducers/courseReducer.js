import {
    FETCH_COURSE,
    FETCH_COURSES,
    UPDATE_LAST_CHANGE,
    UPDATE_COURSE, 
    INIT_COURSE
} from '../actions/types';

const INITIAL_STATE = {
    courses: [],
    currentCourse: {
        title: null,
        text: null,
        creatorsId: null,
        creatorsFullName: '',
        blocks: []
    },
    lastChange: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INIT_COURSE:
            return { ...state, currentCourse: { ...action.payload } };
        case FETCH_COURSES:
            return { ...state, courses: [ ...action.payload ] };
        case FETCH_COURSE:
            return { ...state, currentCourse: { ...action.payload }};
        case UPDATE_LAST_CHANGE:
            return { ...state, lastChange: action.payload };
        case UPDATE_COURSE:
            return { ...state, currentCourse: { ...action.payload }};
        default:
            return state;
    }
}