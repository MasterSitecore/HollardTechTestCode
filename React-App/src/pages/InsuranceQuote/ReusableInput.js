import React from "react";
const ReusableInput = ({ label, id, type = "text", placeholder, className, isDisabled, value, onChange }) => (
    <div className="form-group">
        <label htmlFor={ id }>{ label }</label>
        <input
            id={ id }
            type={ type }
            placeholder={ placeholder }
            className={ `form-control ${className}` } // Applies Bootstrap styling and full width
            disabled={ isDisabled } // Disable the input if isDisabled is true
            value={ value } // Set the input value from the parent component
            onChange={ (e) => onChange({ id: id, value: e.target.value }) } // Call the onChange method with the field name and new value
        />
    </div>
);
export default ReusableInput;