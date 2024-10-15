import React, { useEffect, useState } from "react";
import './InsuranceQuote.css'; // Import the CSS file
import RiskItemDetailsModal from "./RiskItemDetailsModal";
import axios from "axios";

const QuoteTable = ({ riskItems, updateRiskItem }) => {
    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(null); // State to hold the current quote being edited

    useEffect(() => {
        // Fetch the data from the JSON file
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

    const handleShowModal = () => {
        setCurrentQuote(null); // Reset current quote for adding a new item
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentQuote(null); // Reset current quote when closing modal
    };

    const handleEdit = (id) => {
        const quoteToEdit = riskItems.find(quote => quote.id === id);
        setCurrentQuote(quoteToEdit); // Set the current quote to the one being edited
        setShowModal(true); // Show the modal
    };

    const handleDelete = (id) => {
        const updatedRiskItems = riskItems.filter(quote => quote.id !== id);
        updateRiskItem(updatedRiskItems); // Directly update the risk items
    };

    const handleItemSubmit = (itemDetails) => {
        if (currentQuote) {
            // If editing, update the existing quote
            const updatedRiskItems = riskItems.map(quote =>
                quote.id === currentQuote.id ? { ...quote, ...itemDetails } : quote
            );
            updateRiskItem(updatedRiskItems);
        } else {
            // If adding, generate a new quote with an auto-incrementing ID
            const newQuote = {
                id: riskItems.length ? Math.max(...riskItems.map(q => q.id)) + 1 : 1, // Auto-increment ID
                ...itemDetails
            };
            updateRiskItem([...riskItems, newQuote]);
        }
        handleCloseModal();
    };

    const getDropDownDescription = (dropdownid, lookupcode) => {
        if (lookupcode && Array.isArray(lookupcode)) {
            const item = lookupcode.find(m => m.value === dropdownid);
            return item ? item.label : "Unknown";
        }
        return "Unknown";
    };

    return (
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card shadow mb-4 border-animation">
                <div className="text-left">
                    <h2 className="heading">Quote Risk</h2>
                </div>
                <div className="card-header py-3">
                    <button className="btn btn-primary" onClick={ handleShowModal }>
                        Add New Item
                    </button>
                    <RiskItemDetailsModal
                        key={ `model + ${currentQuote != null ? currentQuote.id : "quote"}` } // Ensure modal key changes when opening/closing
                        show={ showModal }
                        handleClose={ handleCloseModal }
                        onSubmit={ handleItemSubmit }
                        currentQuote={ currentQuote } // Pass the current quote to the modal
                    />
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year of Manufacture</th>
                                    <th>Sum Insured</th>
                                    <th>Rate</th>
                                    <th>Premium</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { riskItems.map(({ id, makeId, modelId, sumInsured, rateApplied, premium, yearOfManufacture }) => (
                                    <tr key={ `quote-${id}` }> {/* Ensure each key is unique */ }
                                        <td>{ id }</td>
                                        <td>{ getDropDownDescription(makeId, makeData) }</td>
                                        <td>{ getDropDownDescription(modelId, modelData) }</td>
                                        <td>{ yearOfManufacture }</td>
                                        <td>{ sumInsured }</td>
                                        <td>{ rateApplied }</td>
                                        <td>{ premium }</td>
                                        <td>
                                            <button className="btn btn-warning button-spacing" onClick={ () => handleEdit(id) }>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger button-spacing" onClick={ () => handleDelete(id) }>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr />
            </div>
        </div>
    );
};

export default QuoteTable;
