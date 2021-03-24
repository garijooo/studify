import { 
    SIGN_IN, 
    SIGN_OUT, 
    FETCH_COURSES_BY_CREATOR, 
    FETCH_COURSES_BY_LEARNER,
    UPDATE_TEACHERS_LAST_CHANGE,
    FETCH_STATUS
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    id: null,
    email: '',
    username: '',
    name: '',
    surname: '',
    role: '',
    fetchedCourses: [],
    teachersLastChange: null,
    fetchStatus: true 
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, 
                token: action.payload.token,
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                surname: action.payload.surname,
                username: action.payload.username,
                role: action.payload.role,
                teachersLastChange: action.payload.date
            };
        case SIGN_OUT:
            return { ...state,
                token: null, 
                id: null,  
                email: null,  
                username: null, 
                role: null, 
                fetchedCourses: [], 
                teachersLastChange: null 
            };
        case FETCH_COURSES_BY_CREATOR:
            return { ...state, fetchedCourses: action.payload };
        case FETCH_COURSES_BY_LEARNER:
            return { ...state, fetchedCourses: action.payload };
        case FETCH_STATUS:
            return { ...state, fetchStatus: action.payload };
        case UPDATE_TEACHERS_LAST_CHANGE:
            return { ...state, teachersLastChange: action.payload };
        default:
            return state;
    }
}