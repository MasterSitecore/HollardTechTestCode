// redux/actions/authActions.js
import axios from 'axios';
import { signup, SignIn, QuoteDetails, updateProfile } from '../../pages/InsuranceQuote/services/services';
import {
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE
    , SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from './profileActiontypes';
import { setLoading } from "../insuranceQuote/appReducer";

export const signUpUser = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));

            dispatch({ type: SIGN_UP_REQUEST });

            const request = {
                title: "Mr",
                name: payload.firstName,
                surname: payload.lastName,
                email: payload.email,
                password: payload.password,
            };
            const response = await signup(request);

            console.log(response);
            // Mock response data
            const mockResponse = {
                user: {
                    id: 1,
                    name: payload.username,
                    title: '',
                    Surname: '',
                    Phone: '',
                    Address1: '',
                    Address2: '',
                    token: 'mocked-jwt-token',
                },
                message: 'User registered successfully!',
            };

            // Dispatch the success action with mock data
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: response,
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: SIGN_UP_FAILURE,
                payload: 'Mock error: Sign-up failed!',
            });
        }
    };
};

export const SignInUser = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));

            dispatch({ type: SIGN_IN_REQUEST });

            // Simulate a network request using setTimeout
            // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2s delay
            const response = await SignIn(payload);

            console.log(response);
            // Dispatch the success action with mock data
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: response,
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: SIGN_IN_FAILURE,
                payload: 'Mock error: Sign-up failed!',
            });
        }
    };
};

export const SignOut = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));

            dispatch({ type: SIGN_OUT_REQUEST });

            // Mock response data
            const mockResponse = {
                user: {
                    id: 0,
                    username: '',
                    email: '',
                    token: '',
                },
                message: 'SIGNOut successfully!',
            };

            // Dispatch the success action with mock data
            dispatch({
                type: SIGN_OUT_SUCCESS,
                payload: mockResponse,
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: SIGN_OUT_FAILURE,
                payload: 'Mock error: Sign-up failed!',
            });
        }
    };
};

export const profileUpdate = (payload) => {
    return async (dispatch, state) => {
        try {

            dispatch(setLoading(true));
            if (payload != undefined) {
                dispatch({ type: PROFILE_REQUEST });

                const response = await updateProfile(payload);

                // Dispatch the success action with mock data
                dispatch({
                    type: PROFILE_SUCCESS,
                    payload: response,
                });
            }
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: PROFILE_FAILURE,
                payload: 'error: profile update failed!',
            });
        }
    };
};

