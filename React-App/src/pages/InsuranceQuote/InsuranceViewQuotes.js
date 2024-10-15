import React, { useState, useEffect } from "react";
import Topbar from "../../components/Navigation/Topbar";
import Sidebar from "../../components/Navigation/Sidebar";
import './InsuranceQuote.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom';
import { deleteQuoteItem, FetchExistingQuoteList } from "./services/services";
import axios from "axios";

const InsuranceViewQuotes = (props) => {
    const navigate = useNavigate();
    const [quotes, setQuotes] = useState([]);
    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);

    // const handleDelete = (id) => {
    //     if (window.confirm(`Are you sure you want to delete quote with ID: ${id}?`)) {
    //         try {
    //             // Assuming `deleteQuote` is an async function
    //             props.deleteQuote(id);

    //             // Remove the deleted quote from the state
    //             setQuotes(prevQuotes => prevQuotes.filter(quote => quote.coverDetails.coverDetailId !== id));

    //             // Optional: show success message
    //             alert('Quote deleted successfully!');
    //         } catch (error) {
    //             console.error('Error deleting the quote:', error);
    //             alert('Failed to delete the quote.');
    //         }
    //     }
    // };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete quote with ID: ${id}?`)) {
            try {
                const response = deleteQuoteItem(id);

                if (response) {
                    // Remove the deleted quote from the state
                    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.coverDetails.coverDetailId !== id));

                    alert('Quote deleted successfully!');
                } else {
                    alert('Failed to delete the quote.');
                }
            } catch (error) {
                console.error('Error deleting the quote:', error);
                alert('An error occurred while deleting the quote.');
            }
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/static/dropdownData.json');
                const data = response.data;

                console.log("Fetched Data:", data); // Log the fetched data for inspection

                if (data) {
                    setMakeData(data["VehicleMakeList"] || []);
                    setModelData(data["VehicleModelList"] || []);
                } else {
                    console.error("No data found for dropdowns");
                }
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                
                const existingQuoteList = await FetchExistingQuoteList(props.loggedInUserId.profileData.customerId);

                if (existingQuoteList.coverAndRiskList.length > 0) {
                    setQuotes(existingQuoteList.coverAndRiskList); // Update the quotes state with the fetched data
                }
            } catch (error) {
                console.error("Failed to fetch quotes:", error);
            }
        };

        fetchQuotes(); // Call the fetch function

    }, [props.loggedInUserId, props.deleteQuote]); // Dependency on loggedInUserId

    const handleEdit = (id) => {
        alert(`Edit quote with ID: ${id}`);
        navigate('/quotes');
    };

    const getDropDownDescription = (dropdownid, lookupcode) => {
        if (lookupcode && Array.isArray(lookupcode)) {
            const item = lookupcode.find(m => m.value === dropdownid);
            return item ? item.label : "Unknown";
        }
        return "Unknown";
    };

    // Calculate total sum insured and premium for all quotes
    const totalSumInsured = quotes.reduce((total, quote) => {
        const individualSumInsured = quote.riskDetails.reduce((acc, risk) => acc + parseFloat(risk.sumInsured || 0), 0);
        return total + individualSumInsured;
    }, 0);

    const totalPremium = quotes.reduce((total, quote) => {
        const individualPremium = quote.riskDetails.reduce((acc, risk) => acc + parseFloat(risk.premium || 0), 0);
        return total + individualPremium;
    }, 0);

    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar { ...props } />
                        <div className="container-fluid pt-3">
                            <div className="card o-hidden border-0 shadow-lg">
                                <div className="card shadow mb-4 border-animation">
                                    <div className="text-left mb-3">
                                        <h2 className="heading">Risk and Quote Details</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-nowrap text-sm">Quote Number</th>
                                                        <th className="text-sm">Quote Description</th>
                                                        <th className="text-nowrap text-sm">Start Date</th>
                                                        <th className="text-nowrap text-sm">Expiry Date</th>
                                                        <th className="text-sm">Quote Created At</th>
                                                        <th className="text-nowrap text-sm">Sum Insured</th>
                                                        <th className="text-nowrap text-sm">Premium</th>
                                                        <th className="text text-sm">Associated Risks</th>
                                                        <th className="text-nowrap text-sm">Actions</th>
                                                    </tr>
                                                </thead>

                                                { quotes.length === 0 ? (
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="9" className="text-center">No quotes available.</td>
                                                        </tr>
                                                    </tbody>
                                                ) : (
                                                    <tbody>
                                                        { quotes.map((quoteitem, index) => {
                                                            const individualSumInsured = quoteitem.riskDetails.reduce((total, risk) => total + parseFloat(risk.sumInsured || 0), 0);
                                                            const individualPremium = quoteitem.riskDetails.reduce((total, risk) => total + parseFloat(risk.premium || 0), 0);

                                                            return (
                                                                <tr key={ quoteitem.coverDetails.coverDetailId }>
                                                                    <td>{ quoteitem.coverDetails.quotenumber }</td>
                                                                    <td>{ 'Motor Risk Insurance' }</td>
                                                                    <td>{ new Date(quoteitem.coverDetails.coverStartDate).toLocaleDateString() }</td>
                                                                    <td>{ new Date(quoteitem.coverDetails.coverEndDate).toLocaleDateString() }</td>
                                                                    <td>{ new Date(quoteitem.coverDetails.quoteDate).toLocaleDateString() }</td>
                                                                    <td>R{ individualSumInsured.toFixed(2) }</td>
                                                                    <td>R{ individualPremium.toFixed(2) }</td>
                                                                    <td>
                                                                        <ul>
                                                                            { quoteitem.riskDetails.map((risk) => (
                                                                                <li key={ risk.coverDetailId }>
                                                                                    { `Motor Risk Insurance - Make: ${getDropDownDescription(`${risk.makeId}`, makeData)} Model: ${getDropDownDescription(`${risk.modelId}`, modelData)} Premium: R${risk.premium} Sum Insured: R${risk.sumInsured}` }
                                                                                </li>
                                                                            )) }
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex justify-content-around">
                                                                            {/* <button className="btn btn-warning" onClick={ () => handleEdit(quoteitem.coverDetails.id) }>Edit</button>
                                                                            <button className="btn btn-danger" onClick={ () => handleDelete(quoteitem.coverDetails.id) }>Delete</button> */}
                                                                            <div className="d-flex">
                                                                                <button
                                                                                    className="btn btn-warning mr-2"
                                                                                    onClick={ () => handleEdit(quoteitem.coverDetails.coverDetailId) }
                                                                                >
                                                                                    Edit
                                                                                </button>
                                                                                <button
                                                                                    className="btn btn-danger"
                                                                                    onClick={ () => handleDelete(quoteitem.coverDetails.coverDetailId) }
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }) }
                                                        <tr>
                                                            <td colSpan="5" style={ { textAlign: 'right' } }><strong>Total:</strong></td>
                                                            <td>R{ totalSumInsured.toFixed(2) }</td>
                                                            <td>R{ totalPremium.toFixed(2) }</td>
                                                            <td></td> {/* Empty cell for risks */ }
                                                            <td></td> {/* Empty cell for actions */ }
                                                        </tr>
                                                    </tbody>
                                                ) }
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InsuranceViewQuotes;
