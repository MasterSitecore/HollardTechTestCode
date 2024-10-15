// add a fetch api
import axios from 'axios';
import { DELETE_QUOTE_API, GET_INSURANCE_QUOTES, PROFILE_UPDATE_API, Register_Cutomers, SAVE_QUOTE_API, SignIn_Cutomers } from './servicesEndPoint';


// persist quotedata  

export async function persistInsuranceQuote() {

}



// Mock signup action

export async function signup(payload) {
  try {

    const response = await axios.post(Register_Cutomers, payload);
    //setResponseData(response.data); // Set response data to state
    return response.data; // Return response if needed for further actions
  } catch (error) {
    console.error('Error posting data:', error);
    return null; // Return null in case of error
  }
}

export async function SignIn(payload) {
  try {
    const response = await axios.post(SignIn_Cutomers, payload);
    //setResponseData(response.data); // Set response data to state

    return response.data; // Return response if needed for further actions
  } catch (error) {
    console.error('Error posting data:', error);
    return null; // Return null in case of error
  }
}

// export async function FetchExistingQuoteList(payload) {
//   try {

//     const response = await axios.get(GET_INSURANCE_QUOTES + '?customerId=21869201-ED48-4D72-BA7D-E437D5BDB358');
//     //setResponseData(response.data); // Set response data to state

//     return response.data; // Return response if needed for further actions
//   } catch (error) {
//     console.error('Error posting data:', error);
//     return null; // Return null in case of error
//   }
// }
export const FetchExistingQuoteList = async (customerId) => {
  try {
    console.log(`Fetching quotes for customerId: ${customerId}`); // Log the customerId
    const response = await axios.get(`https://localhost:44311/api/Insurance/fetchQuote?customerId=`+customerId );
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error('Error fetching quote:', error.response ? error.response.data : error.message);
    throw error; // You may choose to throw an error or return a custom error response
  }
};

export async function SaveQuote(payload) {
  try {

    const response = await axios.post(SAVE_QUOTE_API, payload);
    return response.data; // Return response if needed for further actions

  } catch (error) {
    console.error('Error posting data:', error);
    return null; // Return null in case of error
  }
}


/// update profile
export async function updateProfile(payload) {
  try {
    // Use PUT or PATCH based on your API's design
    const response = await axios.put(PROFILE_UPDATE_API, payload, {
      headers: {
        'Content-Type': 'application/json' // Explicitly set the content type
      }
    });

    // Manually assign values from the response
    const updatedProfile = {
      customerId: response.data.id,
      title: response.data.title,
      email: response.data.email,
      name: response.data.name,
      surname: response.data.surname,
      password: response.data.password,
      phone: response.data.phone,
      address1: response.data.address1,
      address2: response.data.address2
    };

    // Return the updated profile object for further actions
    return updatedProfile;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error updating profile:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }

    return null; // Return null in case of an error
  }
}

export async function deleteQuoteItem(quoteId) {
  try {
    // Assuming DELETE_QUOTE_API is the endpoint for deleting a quote
    const response = await axios.delete(`${DELETE_QUOTE_API}${quoteId}`);
    return response.data; // Return response if needed for further actions
  } catch (error) {
    console.error('Error deleting quote:', error);
    return null; // Return null in case of error
  }
}