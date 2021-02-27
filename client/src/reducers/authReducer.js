import { 
    SIGN_IN, 
    SIGN_OUT, 
    MY_COURSES, 
    UPDATE_TEACHERS_LAST_CHANGE,
    FETCH_STATUS
} from '../actions/types';

const INITIAL_STATE = {
    _id: null,
    email: null,
    username: null,
    role: null,
    myCourses: [],
    teachersLastChange: null,
    fetchStatus: true 
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, 
                _id: action.payload._id,
                email: action.payload.email,
                username: action.payload.username,
                role: action.payload.role,
                teachersLastChange: action.payload.date
            };
        case SIGN_OUT:
            return { ...state, 
                _id: null,  
                email: null,  
                username: null, 
                role: null, 
                myCourses: [], 
                teachersLastChange: null 
            };
        case MY_COURSES:
            return { ...state, myCourses: action.payload };
        case FETCH_STATUS:
            return { ...state, fetchStatus: action.payload }
        case UPDATE_TEACHERS_LAST_CHANGE:
            return { ...state, teachersLastChange: action.payload };
        default:
            return state;
    }
}