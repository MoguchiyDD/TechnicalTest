import axios from 'axios';

/**
 * Fetches a new QR code from the server
 * @returns {Promise<string|null>}
 */
export const fetchQrTimekeeping = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/timekeeping');
    return response.data.qrCode;
  } catch (error) {
    console.error('Error fetching QR code:', error);
  }
};


/**
 * Confirms the QR code scan by sending a request to the server.
 * @returns {Promise<string|null>}
 */
export const confirmQrTimekeeping = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/timekeeping/confirm');
    return response.data.qrCode;
  } catch (error) {
    console.error('Error confirming scan:', error);
  }
};
