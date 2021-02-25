import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_ALL,
    FETCH_BY_ID
} from './types';

export const signIn = (_id, email, username, role) => {
    return {
        type: SIGN_IN,
        payload: {
            _id,
            username,
            email, 
            role
        }
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const coursesList = (courses) => {
    return {
        type: FETCH_ALL,
        payload: {
            courses
        }
    }
}

export const coursesListOfUser = (courses) => {
    return {
        type: FETCH_BY_ID,
        payload: {
            courses
        }
    }
}