import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    _id: null,
    email: null,
    username: null,
    role: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, 
                _id: action.payload._id, 
                email: action.payload.email, 
                username: action.payload.username,
                role: action.payload.role
            };
        case SIGN_OUT:
            return { ...state, 
                _id: null, 
                email: null, 
                username: null,
                role: null
            };
        default:
            return state;
    }
}