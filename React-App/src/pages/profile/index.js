import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const ProfileUpdateForm = (props) => {
    const navigate = useNavigate();

    // Define local state for form fields
    const [profileData, setProfileData] = useState({
        customerId: (props.profileDetails && props.profileDetails.customerId) || "",
        title: "Mr",
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        address1: '',
        address2: ''
    });

    const [errors, setErrors] = useState({}); // State for validation errors

    // UseEffect to populate the local state with profileDataExisting when the component mounts
    useEffect(() => {
        if (!isEmpty(props.profileDetails)) {
            setProfileData(prevState => ({
                ...prevState, // Spread the previous state
                name: props.profileDetails.name || prevState.name,
                surname: props.profileDetails.surname || prevState.surname,
                email: props.profileDetails.email || prevState.email,
                phone: props.profileDetails.phone || prevState.phone,
                address1: props.profileDetails.address1 || prevState.address1,
                address2: props.profileDetails.address2 || prevState.address2
            }));
        }
    }, [props.profileDetails]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    // Basic form validation logic
    const validate = () => {
        const newErrors = {};
        if (!profileData.name) newErrors.name = "Name is required";
        if (!profileData.surname) newErrors.surname = "Surname is required";
        if (!profileData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!profileData.phone) newErrors.phone = "Phone number is required";
        if (!profileData.address1) newErrors.address1 = "Address Line 1 is required";

        // Password validation
        if (!profileData.password) {
            newErrors.password = "Password is required";
        } else if (profileData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
        } else {
            props.profileUpdate(profileData); // Call the update function
            console.log('Profile data updated:', profileData); // In a real scenario, send this to the backend
            alert('Profile updated successfully!');
            navigate('/dashboard'); // Navigate back to the dashboard
        }
    };

    // Handle back button click
    const handleOnBackClick = (e) => {
        e.preventDefault();
        navigate('/dashboard'); // Navigate back to the dashboard
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar { ...props } />
                    <div className="container mt-4">
                        <h2 className="mb-4">Update Profile</h2>
                        <form onSubmit={ handleSubmit }>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className={ `form-control ${errors.name ? 'is-invalid' : ''}` }
                                        id="name"
                                        name="name"
                                        value={ profileData.name }
                                        onChange={ handleInputChange }
                                    />
                                    { errors.name && <div className="invalid-feedback">{ errors.name }</div> }
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="surname">Surname</label>
                                    <input
                                        type="text"
                                        className={ `form-control ${errors.surname ? 'is-invalid' : ''}` }
                                        id="surname"
                                        name="surname"
                                        value={ profileData.surname }
                                        onChange={ handleInputChange }
                                    />
                                    { errors.surname && <div className="invalid-feedback">{ errors.surname }</div> }
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className={ `form-control ${errors.email ? 'is-invalid' : ''}` }
                                        id="email"
                                        name="email"
                                        value={ profileData.email }
                                        onChange={ handleInputChange }
                                        disabled={ true } // Disabled as it is non-editable
                                    />
                                    { errors.email && <div className="invalid-feedback">{ errors.email }</div> }
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={ `form-control ${errors.password ? 'is-invalid' : ''}` }
                                        id="password"
                                        name="password"
                                        value={ profileData.password }
                                        onChange={ handleInputChange }
                                    />
                                    { errors.password && <div className="invalid-feedback">{ errors.password }</div> }
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        className={ `form-control ${errors.phone ? 'is-invalid' : ''}` }
                                        id="phone"
                                        name="phone"
                                        value={ profileData.phone }
                                        onChange={ handleInputChange }
                                    />
                                    { errors.phone && <div className="invalid-feedback">{ errors.phone }</div> }
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="address1">Address Line 1</label>
                                    <input
                                        type="text"
                                        className={ `form-control ${errors.address1 ? 'is-invalid' : ''}` }
                                        id="address1"
                                        name="address1"
                                        value={ profileData.address1 }
                                        onChange={ handleInputChange }
                                    />
                                    { errors.address1 && <div className="invalid-feedback">{ errors.address1 }</div> }
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address2">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address2"
                                    name="address2"
                                    value={ profileData.address2 }
                                    onChange={ handleInputChange }
                                />
                            </div>

                            <div id="content-wrapper" className="d-flex">
                                <button type="submit" className="btn btn-primary mx-2 p-2">Update Profile</button>
                                <button type="button" className="btn btn-secondary mx-2 p-2" onClick={ handleOnBackClick }>Back</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdateForm;
