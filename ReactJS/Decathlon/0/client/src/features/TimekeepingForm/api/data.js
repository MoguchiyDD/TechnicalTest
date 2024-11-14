import axios from 'axios';

/**
 * Sends the user's data to the server
 * @param {string} data
 */
export const sendDataForm = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/timekeeping/create', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating data in the database:', error);
  }
};
