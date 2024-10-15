export const ADD_INSURANCE_QUOTE_STARTED = "ADD_INSURANCE_QUOTE_STARTED";
export const ADD_INSURANCE_QUOTE_COMPLETED = "ADD_INSURANCE_QUOTE_COMPLETED";
export const ADD_INSURANCE_QUOTE_FAILURE = 'ADD_INSURANCE_QUOTE_FAILURE';

export const ADD_RISK_STARTED = "ADD_RISK_STARTED";
export const ADD_RISK_COMPLETED = "ADD_RISK_COMPLETED";
export const ADD_RISK_FAILURE = 'ADD_RISK_FAILURE';

export const RETREIVE_QUOTE_STARTED = "RETREIVE_QUOTE_STARTED";
export const RETREIVE_QUOTE_COMPLETED = "RETREIVE_QUOTE_COMPLETED";
export const RETREIVE_QUOTE_FAILURE = 'RETREIVE_QUOTE__FAILURE';

export const SET_QUOTE_STATUS = "SET_QUOTE_STATUS";
export const INPUT_CHANGE_STARTED = "INPUT_CHANGE_STARTED";
export const INPUT_CHANGE_COMPLETED = "INPUT_CHANGE_COMPLETED";
export const INPUT_CHANGE_FAILURE = "INPUT_CHANGE_FAILURE";
export const DELETE_QUOTE_STARTED = "DELETE_QUOTE_STARTED";
export const DELETE_QUOTE_SUCCESS = "DELETE_QUOTE_SUCCESS";



// Initial state
const initialState = {
    data: [],
    loading: false,
    error: null,
    quotesList: [],
    quoteStatus: ""
};

// Reducer
export const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INSURANCE_QUOTE_STARTED':
            return { ...state, loading: true };
        case 'ADD_INSURANCE_QUOTE_COMPLETED':
            return { ...state, loading: false, data: action.payload };
        case 'ADD_INSURANCE_QUOTE_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'ADD_RISK_STARTED':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_RISK_COMPLETED':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_RISK_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'RETREIVE_QUOTE_STARTED':
            return { ...state, loading: true };
        case 'RETREIVE_QUOTE_COMPLETED':
            return { ...state, loading: false, quotesList: action.payload };
        case 'RETREIVE_QUOTE_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'CREATE_USER_LOGIN_STARTED':
            return {
                ...state,
                loading: true,
                error: action.payload
            };
        case 'CREATE_USER_LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case "SET_QUOTE_STATUS":
            return {
                ...state,
                quoteStatus: action.payload.status // Update the quote status in the state
            };

        case 'INPUT_CHANGE_STARTED':
            return {
                ...state,
                loading: true,
            };
        case "INPUT_CHANGE_COMPLETED":
            return {
                ...state,
                loading: false,
                data: action.payload // Update the quote status in the state
            };
        case 'INPUT_CHANGE_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };

        case 'DELETE_QUOTE_STARTED':
            return {
                ...state,
                loading: true,
            };
        case "DELETE_QUOTE_SUCCESS":
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
};
