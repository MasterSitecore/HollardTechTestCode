import {
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
    SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from "./profileActiontypes";

// Initial state
const initialState = {
    profileData: {},
    loading: false,
    error: null,
};

// Reducer
export const userProfilReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        case SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload
            };
        case SIGN_IN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        case SIGN_OUT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload
            };
        case SIGN_OUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        case PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload
            };
        case PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };





        default:
            return state;
    }
};
