import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ id, label, lookupCode, onSelect, selectedValue }) => {
    const [items, setItems] = useState([]);
    const [currentValue, setCurrentValue] = useState(selectedValue || ''); // Track the selected value locally

    useEffect(() => {
        // Fetch the data from the JSON file
        const fetchData = async () => {
            try {
                const response = await axios.get('/static/dropdownData.json');
                const data = response.data;

                // Set items based on the lookupCode prop
                if (data[lookupCode]) {
                    setItems(data[lookupCode]);
                } else {
                    console.error(`No data found for lookupCode: ${lookupCode}`);
                }
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchData();
    }, [lookupCode]);

    // Update the selected value when the prop changes (for edit mode)
    useEffect(() => {
        setCurrentValue(selectedValue || ''); // Sync with selectedValue prop if it changes
    }, [selectedValue]);

    // Handle the change event when selecting an option
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setCurrentValue(selectedValue); // Update local state
        onSelect({ id: id, value: selectedValue }); // Notify parent component of the selection
    };

    return (
        <div className="form-group">
            <label htmlFor="dropdown">{ label }</label>
            <select
                className="form-control"
                id={ id }
                value={ currentValue } // Use internal state to control the dropdown
                onChange={ handleChange }
            >
                <option value="">-- Select an option --</option>
                { items.length > 0 ? (
                    items.map((item, index) => (
                        <option key={ index } value={ item.value }>
                            { item.label }
                        </option>
                    ))
                ) : (
                    <option disabled>No items available</option>
                ) }
            </select>
        </div>
    );
};

export default Dropdown;
