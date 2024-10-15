import React, { useEffect, useState } from "react";
import $ from "jquery";
import DropdownList from "../../components/DropdownList";
import ReusableNumericInput from "./ReusableNumericInput";

// Static Modal Component
const RiskItemDetailsModal = ({ show, handleClose, onSubmit, currentQuote }) => {
    // State to hold all input values
    const [formData, setFormData] = useState({
        makeId: "",
        modelId: "",
        sumInsured: "",
        rateApplied: "",
        premium: "0.00",
        yearOfManufacture: 0
    });

    // State to hold validation errors
    const [errors, setErrors] = useState({});

    // Effect to handle modal visibility
    useEffect(() => {
        const modal = $("#staticModal");
        if (show) {
            modal.modal("show");
        } else {
            modal.modal("hide");
        }
        // Edit mode
        if (currentQuote) {
            setFormData(currentQuote);
        }
    }, [show]);

    // Effect to calculate premium when sumInsured or rate changes
    useEffect(() => {
        const { sumInsured, rateApplied } = formData;
        if (sumInsured && rateApplied) {
            const calculatedPremium = (parseFloat(sumInsured) * parseFloat(rateApplied)) / 100;
            setFormData((prevState) => ({
                ...prevState,
                premium: calculatedPremium.toFixed(2),
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                premium: "0.00",
            }));
        }
    }, [formData.sumInsured, formData.rateApplied]);

    // Generalized input change handler
    const handleChange = (keyandvalue) => {
        setFormData((prevState) => ({
            ...prevState,
            [keyandvalue.id]: keyandvalue.value,
        }));

        // Clear error for the field when it is updated
        setErrors((prevErrors) => ({
            ...prevErrors,
            [keyandvalue.id]: ""
        }));
    };

    // Validation function
    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        // Check required fields
        if (!formData.makeId) {
            newErrors.makeId = "Motor Make is required.";
            valid = false;
        }
        if (!formData.modelId) {
            newErrors.modelId = "Model is required.";
            valid = false;
        }
        if (!formData.yearOfManufacture || formData.yearOfManufacture < 1900) {
            newErrors.yearOfManufacture = "Valid Year of Manufacture is required.";
            valid = false;
        }
        if (!formData.sumInsured || isNaN(formData.sumInsured)) {
            newErrors.sumInsured = "Sum Insured is required and must be a number.";
            valid = false;
        }
        if (!formData.rateApplied || isNaN(formData.rateApplied)) {
            newErrors.rateApplied = "Rate is required and must be a number.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handles modal save functionality
    const handleOnSave = () => {
        if (validateForm()) {
            onSubmit(formData);
            handleClose();
        }
    };

    return (
        <>
            { show && <div className="modal-backdrop fade show"></div> }
            <div>
                <div className={ `modal fade ${show ? 'show' : ''}` } tabIndex="-1" role="dialog" style={ { display: show ? 'block' : 'none' } }>
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Motor Risk</h5>
                                <button type="button" className="close" onClick={ handleClose }>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <DropdownList
                                            id="makeId"
                                            label="Motor Make"
                                            lookupCode="VehicleMakeList"
                                            onSelect={ (item) => handleChange(item) }
                                            value={ formData.makeId } // Set value from formData
                                            selectedValue={ formData.make }
                                        />
                                        { errors.makeId && <div className="text-danger">{ errors.makeId }</div> }
                                    </div>
                                    <div className="col-md-6">
                                        <DropdownList
                                            id="modelId"
                                            label="Model"
                                            lookupCode="VehicleModelList"
                                            onSelect={ (item) => handleChange(item) }
                                            value={ formData.modelId } // Set value from formData
                                            selectedValue={ formData.modelId }
                                        />
                                        { errors.modelId && <div className="text-danger">{ errors.modelId }</div> }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <ReusableNumericInput
                                            label="Year of Manufacture"
                                            id="yearOfManufacture"
                                            type="text"
                                            placeholder="Enter your Year of Manufacture"
                                            className="w-100"
                                            numeric={ true }
                                            currencySymbol=""
                                            maxLength={ 4 }
                                            decimalPlaces={ 0 }
                                            onChange={ (event) => handleChange(event) } // Update here
                                            value={ formData.yearOfManufacture } // Set value from formData
                                        />
                                        { errors.yearOfManufacture && <div className="text-danger">{ errors.yearOfManufacture }</div> }
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableNumericInput
                                            label="Sum Insured"
                                            id="sumInsured"
                                            type="text"
                                            placeholder="Enter your Sum Insured"
                                            className="w-100"
                                            numeric={ true }
                                            currencySymbol="R"
                                            maxLength={ 10 }
                                            decimalPlaces={ 2 }
                                            value={ formData.sumInsured } // Pass default value from formData
                                            onChange={ (event) => handleChange(event) } // Update here
                                        />
                                        { errors.sumInsured && <div className="text-danger">{ errors.sumInsured }</div> }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <ReusableNumericInput
                                            label="Rate"
                                            id="rateApplied"
                                            type="text"
                                            placeholder="Enter your Rate"
                                            className="w-100"
                                            numeric={ true }
                                            currencySymbol="%"
                                            maxLength={ 4 }
                                            decimalPlaces={ 2 }
                                            onChange={ (event) => handleChange(event) } // Update here
                                            value={ formData.rateApplied } // Set value from formData
                                        />
                                        { errors.rateApplied && <div className="text-danger">{ errors.rateApplied }</div> }
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableNumericInput
                                            label="Premium"
                                            id="premium"
                                            type="text"
                                            placeholder="Calculated Premium"
                                            className="w-100"
                                            numeric={ true }
                                            currencySymbol=""
                                            maxLength={ 10 }
                                            decimalPlaces={ 2 }
                                            value={ formData.premium } // Set value from formData
                                            onChange={ (event) => handleChange(event) } // Update here
                                            isDisabled={ true }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={ handleClose }>
                                    CLOSE
                                </button>
                                <button type="button" className="btn btn-primary" onClick={ handleOnSave }>
                                    SAVE Risk
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RiskItemDetailsModal;
