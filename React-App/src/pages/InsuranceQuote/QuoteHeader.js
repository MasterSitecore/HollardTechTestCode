import React, { useEffect, useState } from "react";
import ReusableInput from "./ReusableInput"; // Adjust the import path as necessary
import './InsuranceQuote.css'; // Import the custom CSS file
import DropdownList from '../../components/DropdownList';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components
import { get } from "lodash";

const QuoteHeader = (props) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const formattedDate = currentDate.toLocaleString();

    const handleSelect = (item, field) => {
        // Clear errors when a valid selection is made
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: "" // Clear the error for the selected field
        }));

        props.onChange(item, true); // Update the parent with the selected value
    };

    const validateFields = () => {
        let newErrors = {};
        if (!props.profileDetails.name) {
            newErrors.clientName = "Client Name is required";
        }
        if (!props.quoteData.quotenumber) {
            newErrors.quoteNumber = "Quote Number is required";
        }
        if (!props.profileDetails.address1 && !props.profileDetails.address2) {
            newErrors.clientAddress = "Client Address is required";
        }
        if (!props.quoteData.branchCode) {
            newErrors.branchCode = "Branch Name is required";
        }
        if (!props.quoteData.premiumPayoutTerm) {
            newErrors.premiumPayoutTerm = "Policy Frequency is required";
        }
       


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            setShowAlert(false);
            console.log("Form submitted successfully!");
            // Submit form data
        } else {
            setShowAlert(true);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container fluid className="px-1 mx-1">
            <Card className="border-0 full-height">
                <Card.Body className="d-flex flex-column p-3">
                    <div className="mb-4">
                        <h2 className="heading">Quote Header</h2>
                    </div>

                    {showAlert && <Alert variant="danger">Please fill in all required fields.</Alert>}

                    <Form className="flex-grow-1" onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <ReusableInput
                                    label="Client Name"
                                    id="clientName"
                                    type="text"
                                    placeholder="Client name"
                                    className="form-control"
                                    isDisabled={true}
                                    value={get(props.profileDetails, "name", "")}
                                    onChange={props.onChange}
                                />
                                {errors.clientName && <div className="text-danger">{errors.clientName}</div>}
                            </Col>
                            <Col md={6} className="mb-3">
                                <ReusableInput
                                    label="Quote Number"
                                    id="quoteNumber"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                    isDisabled={true}
                                    value={props.quoteData.quotenumber}
                                    onChange={props.onChange}
                                />
                                {errors.quoteNumber && <div className="text-danger">{errors.quoteNumber}</div>}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} className="mb-3">
                                <ReusableInput
                                    label="Client Address"
                                    id="clientAddress"
                                    type="text"
                                    placeholder="Address details"
                                    className="form-control"
                                    value={`${get(props.profileDetails, "address1", "")} ${get(props.profileDetails, "address2", "")}`}
                                    isDisabled={true}
                                />
                                {errors.clientAddress && <div className="text-danger">{errors.clientAddress}</div>}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <DropdownList
                                    id="branchCode"
                                    label="Branch Name"
                                    lookupCode="branchList"
                                    onSelect={(item) => handleSelect(item, 'branchCode')}
                                    value={props.quoteData.branchCode}
                                />
                                {errors.branchCode && <div className="text-danger">{errors.branchCode}</div>}
                            </Col>
                            <Col md={6} className="mb-3">
                                <DropdownList
                                    id="premiumPayoutTerm"
                                    label="Policy Frequency"
                                    lookupCode="PolicyFrequency"
                                    onSelect={(item) => handleSelect(item, 'premiumPayoutTerm')}
                                    value={props.quoteData.premiumPayoutTerm}
                                />
                                {errors.premiumPayoutTerm && <div className="text-danger">{errors.premiumPayoutTerm}</div>}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <ReusableInput
                                    label="Cover Start Date"
                                    id="coverStartDate"
                                    type="date"
                                    placeholder="Start Date"
                                    className="form-control"
                                    value={props.quoteData.CoverStartDate}
                                    onChange={(item) => handleSelect(item, 'coverStartDate')}
                                />
                                {errors.coverStartDate && <div className="text-danger">{errors.coverStartDate}</div>}
                            </Col>
                            <Col md={6} className="mb-3">
                                <ReusableInput
                                    label="Expiry Date"
                                    id="coverEndDate"
                                    type="date"
                                    placeholder="Expiry Date"
                                    className="form-control"
                                    value={props.quoteData.CoverEndDate}
                                    onChange={(item) => handleSelect(item, 'coverEndDate')}
                                />
                                {errors.coverEndDate && <div className="text-danger">{errors.coverEndDate}</div>}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <ReusableInput
                                    label="Transaction Date"
                                    id="quoteDate"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                    isDisabled={true}
                                    value={props.quoteData.CoverEndDate || formattedDate}
                                />
                            </Col>
                        </Row>

                        <Button type="submit" className="mt-3">Submit Quote</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default QuoteHeader;
