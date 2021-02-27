import axios from 'axios';
import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_COURSE,
    FETCH_COURSES,
    MY_COURSES,
    UPDATE_LAST_CHANGE,
    UPDATE_TEACHERS_LAST_CHANGE,
    FETCH_STATUS
} from './types';

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

export const signIn = (_id, email, username, role, lastChange) => {
    return {
        type: SIGN_IN,
        payload: {
            _id,
            username,
            email, 
            role,
            lastChange
        }
    };
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

export const fetchCourse = id => async dispatch => {
    try { 
        const response = await axios.get(`/api/courses/fetch/course/${id}`, config);
        dispatch({
            type: FETCH_COURSE,
            payload: response.data.course   
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

export const fetchTeachersCourses = id => async dispatch => {
    try { 
        const response = await axios.get(
            `/api/courses/fetch/courses/${id}`,
            config
        );
        dispatch({
            type: MY_COURSES,
            payload: response.data.courses   
        });
    } catch(err) {
        console.log(err);
    } 
}