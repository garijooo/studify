import axios from 'axios';
import {
    SIGN_IN,
    SIGN_OUT,
    INIT_COURSE,
    FETCH_COURSE,
    FETCH_COURSES,
    FETCH_COURSES_BY_CREATOR,
    FETCH_COURSES_BY_LEARNER,
    UPDATE_LAST_CHANGE,
    UPDATE_TEACHERS_LAST_CHANGE,
    FETCH_STATUS,
    UPDATE_COURSE
} from './types';

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};



export const signIn = (user, token) => {
    return {
        type: SIGN_IN,
            payload: {
                token,
                id: user._id,
                username: user.username,
                name: user.name,
                surname: user.surname,
                email: user.email, 
                role: user.role,
                lastChange: Date.now()
            }
    }
}
export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const updateLastChange = date => {
    return {
        type: UPDATE_LAST_CHANGE,
        payload: date
    }
}
export const updateTeachersLastChange = date => {
    return {
        type: UPDATE_TEACHERS_LAST_CHANGE,
        payload: date
    }
}

export const updateFetchStatus = value => {
    return {
        type: FETCH_STATUS,
        payload: value
    }
}
export const initCourse = (initCourse) => {
    return {
        type: INIT_COURSE, 
        payload: initCourse
    }
}
export const updateCourse = (id, course) => async dispatch => {
    try {
        const { data } = await axios.patch(`/api/courses/update/course/${id}`, course, config);
        dispatch({
            type: UPDATE_COURSE,
            payload: data.course   
        });
    } catch(err) {
        console.log(err);
    }
}

export const fetchCourse = id => async dispatch => {
    try { 
        const { data } = await axios.get(`/api/courses/fetch/course/${id}`, config);
        dispatch({
            type: FETCH_COURSE,
            payload: data.course   
        });
    } catch(err) {
        console.log(err);
    } 
}

export const fetchCourses = () => async dispatch => {
    try { 
        const response = await axios.get(`/api/courses/fetch/courses`, config);
        dispatch({
            type: FETCH_COURSES,
            payload: response.data.courses   
        });
    } catch(err) {
        console.log(err);
    } 
}

export const fetchCoursesByCreator = id => async dispatch => {
    try { 
        const response = await axios.get(
            `/api/courses/fetch/courses/creator/${id}`,
            config
        );
        dispatch({
            type: FETCH_COURSES_BY_CREATOR,
            payload: response.data.courses   
        });
    } catch(err) {
        console.log(err);
    } 
}

export const fetchCoursesByLearner = id => async dispatch => {
    try { 
        const response = await axios.get(
            `/api/courses/fetch/courses/learner/${id}`,
            config
        );
        dispatch({
            type: FETCH_COURSES_BY_LEARNER,
            payload: response.data.courses   
        });
    } catch(err) {
        console.log(err);
    } 
}
