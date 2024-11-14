const { insertData } = require('../model/timekeeping');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

let currentQRCode = '';
let currentUniqueData = '';


// Generates a QR code with a new unique UUID
const generateQRCode = async () => {
  currentUniqueData = `http://localhost:5173/timekeeping/${uuidv4()}`;
  console.log('DEBUG URL:', currentUniqueData);
  currentQRCode = await QRCode.toDataURL(currentUniqueData, {
    width: 320,
    // color: {
    //   dark: '#f8fafc',
    //   light: '#020617'
    // }
  });
};


module.exports = (io) => {
  const router = express.Router();

  // Generate QR code
  router.post('/timekeeping', async (req, res) => {
    try {
      if (!currentQRCode) await generateQRCode();
      res.status(200).json({
        qrCode: currentQRCode
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to generate QR code',
        error: err.message
      });
    }
  });

  // Generate a QR code again if you receive it
  router.post('/timekeeping/confirm', async (req, res) => {
    try {
      await generateQRCode();
      io.emit('qrUpdated', currentQRCode);
      res.status(200).json({
        success: true,
        message: 'QR Code scanned and updated',
        qrCode: currentQRCode
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to generate QR code',
        error: err.message
      });
    }
  });

  // Inspect the datathe in the database
  router.post('/timekeeping/create', async (req, res) => {
    const { username, datetime } = req.body;

    insertData(username, datetime, (err) => {
      if (err) {
        console.log(`Failed to insert data ${err.message}`);
        return res.status(500).json({ message: 'Ошибка подтверждения', error: err.message });
      }
      console.log('Successfully saved data');
      res.status(200).json({
        success: true,
        message: 'Успешно подтверждено'
      });
    });
  });

  return router;
}
