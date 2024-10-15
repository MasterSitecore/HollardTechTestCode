import { get } from 'lodash';
import { deleteQuoteItem, FetchExistingQuoteList, FetchQuoteDetails, SaveQuote } from '../../pages/InsuranceQuote/services/services';
import { setLoading } from "../insuranceQuote/appReducer";
import {
    RETREIVE_QUOTE_STARTED, RETREIVE_QUOTE_COMPLETED, RETREIVE_QUOTE_FAILURE,
    ADD_INSURANCE_QUOTE_STARTED, ADD_INSURANCE_QUOTE_COMPLETED, ADD_INSURANCE_QUOTE_FAILURE,
    SET_QUOTE_STATUS,
    INPUT_CHANGE_STARTED,
    INPUT_CHANGE_COMPLETED,
    INPUT_CHANGE_FAILURE,
    DELETE_QUOTE_STARTED,
    DELETE_QUOTE_SUCCESS
} from './quoteReducer';


export const GetQuoteListDetails = (payload) => {
    debugger;
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));

            dispatch({ type: RETREIVE_QUOTE_STARTED });

            const response = await FetchExistingQuoteList(payload);

            console.log(response);
            // Mock response data

            // Dispatch the success action with mock data
            dispatch({
                type: RETREIVE_QUOTE_COMPLETED,
                payload: response,
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: RETREIVE_QUOTE_FAILURE,
                payload: 'error: Sign-up failed!',
            });
        }
    };
};
const updateRiskItems = (riskItems, customerId) => {
    const updatedRiskItems = riskItems.map((item) => ({
        ...item, // Spread the existing properties of each risk item
        customerId: customerId,  // Update customerId
        coverDetailId: 0,        // Set coverDetailId to 0
        riskDetailId: 0          // Set riskDetailId to 0
    }));

    return updatedRiskItems;
};
export const AddQuote = (payload, riskItems) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading(true));
debugger;
            dispatch({ type: ADD_INSURANCE_QUOTE_STARTED });
            const customerId = get(getState().profileDetails.profileData, "customerId", "");

            const updatePayload = {
                customerId: customerId,
                coverDetails: payload,
                riskDetails: updateRiskItems(riskItems, customerId)
            }

            const response = await SaveQuote(updatePayload);

            // Dispatch the success action with mock data
            dispatch({
                type: ADD_INSURANCE_QUOTE_COMPLETED,
                payload: response,
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: ADD_INSURANCE_QUOTE_FAILURE,
                payload: 'Mock error: Sign-up failed!',
            });
        }
    };
};
export const editQuote = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));

            // Dispatch the success action with mock data
            dispatch({
                type: SET_QUOTE_STATUS,
                payload: {
                    status: "edit" // Set the status to "edit"
                }
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: ADD_INSURANCE_QUOTE_FAILURE,
                payload: 'Edit Quote failed!',
            });
        }
    };
};
export const updateQuote = (payload) => {
    return  (dispatch) => {
        try {
            dispatch(setLoading(true));

            // Dispatch the success action with mock data
            dispatch({
                type: INPUT_CHANGE_COMPLETED,
                payload: payload
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: INPUT_CHANGE_FAILURE,
                payload: 'update Quote failed!',
            });
        }
    };
};

export const deleteQuote = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setLoading(true));

            dispatch({ type: ADD_INSURANCE_QUOTE_STARTED });

            const response = await deleteQuoteItem(payload);

            // Dispatch the success action with mock data
            dispatch({
                type: DELETE_QUOTE_STARTED,
                payload: response,
            });
            dispatch(setLoading(false));
        } catch (error) {
            // Simulate an error response
            dispatch({
                type: DELETE_QUOTE_SUCCESS,
                payload: 'delete error: quote delete!',
            });
        }
    };
};
