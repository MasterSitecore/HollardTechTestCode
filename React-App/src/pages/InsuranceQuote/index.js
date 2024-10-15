import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import './InsuranceQuote.css'; // Import the custom CSS file
import QuoteHeader from "./QuoteHeader";
import QuoteTable from "./QuoteTable";
import Sidebar from "../../components/Navigation/Sidebar";
import Topbar from "../../components/Navigation/Topbar";
import { get } from "lodash";
import { useNavigate } from 'react-router-dom';


const InsuranceMainForm = (props) => {
    const navigate = useNavigate();
    // Assume there's a Redux state slice for quotes
    const quoteFromRedux = useSelector((state) => state.insuranceQuote.data); // Adjust selector based on your Redux state structure
    const isEditMode = props.quoteStatus; // Assuming this prop indicates whether it's edit mode or not

    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
    };
    const [currentDate, setCurrentDate] = useState(new Date());
    // Format the date (e.g., "October 10, 2024, 14:30:00")
    const formattedDate = currentDate.toLocaleString();

    const [quoteData, setQuoteData] = useState({
        quotenumber: generateRandomQuoteNumber(),
        customerid: get(props.profileDetails, "customerId", ""),
        coverStartDate: formatDate(today),       // Initialize with today's date
        coverEndDate: formatDate(nextYear),
        branchCode: "",      // Initialize with date one year later
        premiumPayoutTerm:"",
        quoteDate:formattedDate
        // Other fields as necessary
    });
 
    const [validationErrors, setValidationErrors] = useState({});

    const [riskItems, setRiskItems] = useState(
        [
            { id: 1, makeId: "1", modelId: "1", sumInsured: "50000", rateApplied: "10", premium: "5000", yearOfManufacture: "2020" },

        ]
    );

    function generateRandomQuoteNumber() {
        // Generate a random number between 100000 and 999999 (6 digits)
        const min = 100000;
        const max = 999999;
        const randomQuoteNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return 'Quote- ' + randomQuoteNumber;
    }

    const handleInputChange = (item, isUpdateredux) => {
        // Update the state and store the new value immediately
        const updatedData = {
            ...quoteData,
            [item.id]: item.value // Update the corresponding field with the new value
        };
        props.updateQuote(updatedData); // Pass the updated state to the Redux function
        setQuoteData(updatedData); // Set the new state

        // Update redux if needed
      //  if (isUpdateredux) {
           
       // }
    };

    const handleQuotePersist = (e) => {
        e.preventDefault()

        props.AddQuote(quoteData, riskItems);
        navigate('/viewQuote');
        console.log("Quote has been saved successfully");

    };

    useEffect(() => {
        if (isEditMode && quoteFromRedux) {
            // Update local state with the data from Redux if in edit mode
            setQuoteData((prevData) => ({
                ...prevData,
                ...quoteFromRedux // Merge Redux data into local state
            }));
        }
    }, [isEditMode, quoteFromRedux]); // Dependency array includes isEditMode and quoteFromRedux

    return (
        <>
            <div id="wrapper">
                {/* <!-- Sidebar --> */ }
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* <!-- Main Content --> */ }
                    <div id="content">
                        {/* <!-- Topbar --> */ }
                        <Topbar { ...props } />
                        {/* <!-- End of Topbar --> */ }

                        {/* <!-- Begin Page Content --> */ }
                        <div className="container-fluid">
                            {/* <!-- Content Row --> */ }
                            <QuoteHeader { ...props }
                                quoteData={ quoteData }
                                setQuoteData={ setQuoteData }
                                onChange={ handleInputChange }
                                setValidationErrors={ setValidationErrors }
                                validationErrors={ validationErrors } />
                            <QuoteTable
                                riskItems={ riskItems }
                                updateRiskItem={ setRiskItems } />
                        </div>
                    </div>
                    <div className="card-header py-3">
                        <button id="btnPersistQuote" className="btn btn-primary" onClick={ handleQuotePersist }>
                            Persist Quote
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default InsuranceMainForm;