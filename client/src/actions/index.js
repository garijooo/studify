import axios from 'axios';
import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_COURSE,
    FETCH_COURSES,
    FETCH_COURSES_BY_ID
} from './types';
const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

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

export const fetchCoursesById = id => async dispatch => {
    try { 
        const response = await axios.get(
            `/api/courses/fetch/courses/${id}`,
            config
        );
        dispatch({
            type: FETCH_COURSES_BY_ID,
            payload: response.data.courses   
        });
    } catch(err) {
        console.log(err);
    } 
}