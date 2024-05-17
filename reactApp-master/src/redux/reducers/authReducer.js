import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '@redux/actions/ActionTypes';

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    authToken: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userProfile: action.payload.userProfile,
                authToken: action.payload.authToken,
            };
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
