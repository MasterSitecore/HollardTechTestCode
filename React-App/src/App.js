import React from "react";
import Routes from "./routes";
import { connect } from "react-redux";
import { signUpUser, SignInUser, SignOut, profileUpdate } from "./redux/insuranceQuote/profileAction";
import { GetQuoteDetails, AddQuote, GetQuoteListDetails, updateQuote, deleteQuote } from "./redux/insuranceQuote/quoteActions";
const App = (props) => {
    return <Routes { ...props } />;  // Spread props here to pass them to Routes
};

// Step 2: Map Redux state to props
const mapStateToProps = (state) => ({
    loading: state.loading.loading,
    profileDetails: state.profileDetails.profileData,
    loggedInUserId: state.profileDetails,
    quotesListData: state.insuranceQuote.quotesList,
    quoteStatus: state.insuranceQuote.quoteStatus
});

// Step 3: Map dispatch to props (connect action)
const mapDispatchToProps = (dispatch) => {
    return {
        // intialise all redux the actions here  
        signUpUser: (signupPayload) => {
            return dispatch(signUpUser(signupPayload));
        },
        SignInUser: (payload) => {
            return dispatch(SignInUser(payload));
        },
        SignOut: () => {
            return dispatch(SignOut());
        },
        GetQuoteListDetails: (payload) => {
            return dispatch(GetQuoteListDetails(payload));
        },
        AddQuote: (payload, riskItems) => {
            return dispatch(AddQuote(payload, riskItems));
        },
        profileUpdate: (payload) => {
            return dispatch(profileUpdate(payload));
        },
        updateQuote: (payload) => {
            return dispatch(updateQuote(payload));
        },
        deleteQuote: (payload) => {
            return dispatch(deleteQuote(payload));
        },

    }
};

// Step 4: Connect the component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);