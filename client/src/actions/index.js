import {
    SIGN_IN,
    SIGN_OUT
} from './types';

export const signIn = (username) => {
    return {
        type: SIGN_IN,
        payload: {
            username
        }
    };
}
