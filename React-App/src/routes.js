import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cards from "./pages/Cards";
import Charts from "./pages/Charts";
import InsuranceMainForm from "./pages/InsuranceQuote/";
import InsuranceViewQuotes from "./pages/InsuranceQuote/InsuranceViewQuotes";
import "./pages/InsuranceQuote/loader.css"; // Import custom CSS
import ProfileUpdate from "./pages/profile";
import { isEmpty } from "lodash";

// Bootstrap Spinner
const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center loader-container">
        <img
            src={`${process.env.PUBLIC_URL}/loading-spinner.gif`}
            alt="Loading..."
            className="loader-image"
        />
    </div>
);

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
    const profileData = useSelector((state) => state.profileDetails.profileData); // Access profileData from Redux
    const navigate = useNavigate();
    let isAuthenticated =false;
    // Authentication check logic
    if( !isEmpty(profileData))
    {
        isAuthenticated=true;
       
    }
    

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/"); // Redirect to sign-in page if token is not present
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? element : null; // Render the element if authenticated, otherwise null
};

const AppRoutes = (props) => {
    const isLoading = useSelector((state) => state.loading.isLoading); // Access loading state from Redux

    return (
        <BrowserRouter>
            {isLoading ? (
                <LoadingSpinner /> // Show loading spinner when loading
            ) : (
                <Routes>
                    <Route path="/" element={<SignIn {...props} />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard {...props} />} />} />
                    <Route path="/signup" element={<SignUp {...props} />} />
                    <Route path="/profileupdate" element={<ProtectedRoute element={<ProfileUpdate {...props} />} />} />

                    <Route path="/charts" element={<ProtectedRoute element={<Charts />} />} />
                    <Route path="/cards" element={<ProtectedRoute element={<Cards />} />} />
                    <Route path="/quotes" element={<ProtectedRoute element={<InsuranceMainForm {...props} />} />} />
                    <Route path="/viewQuote" element={<ProtectedRoute element={<InsuranceViewQuotes {...props} />} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default AppRoutes;
