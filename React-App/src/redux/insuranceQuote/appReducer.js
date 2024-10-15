// redux/loadingSlice.js
const initialState = {
    isLoading: false
};

// Action Types
const SET_LOADING = "SET_LOADING";

// Action Creators
export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
});

// Reducer
export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};
