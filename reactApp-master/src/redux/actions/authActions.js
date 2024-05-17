// authActions.js
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './ActionTypes';

// Define action creators
export const loginSuccess = (userProfile, authToken) => ({
    type: LOGIN_SUCCESS,
    payload: { userProfile, authToken },
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});
