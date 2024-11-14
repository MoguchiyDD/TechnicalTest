import React, { useState, useEffect, useRef } from 'react';

import { confirmQrTimekeeping } from '../../features/QrTimekeeping/api/qr';
import { sendDataForm } from '../../features/TimekeepingForm/api/data';

import { MessageUI } from './ui/MessageUI';
import { CardUI } from './ui/CardUI';

function TimekeepingFormPage() {
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState(null);
  const fetchTimeoutRef = useRef(null);

  /**
   * Sends the user's data to the server and displays a success or error message
   * If the request is successful, the message is displayed for 3 seconds and the window is closed
   * If the request fails, the message is displayed until the user closes the window
   * @param {object} newData - Object with the user's new data
   */
  const handleSendData = async (newData) => {
    const response = await sendDataForm(JSON.stringify({
      username: form !== newData.username ? newData.username : form.username,
      datetime: new Date()
    }));
    setMessage({
      status: response.status,
      message: response.data.message
    });

    fetchTimeoutRef.current = setTimeout(() => {
      setMessage(null);
      window.close();
    }, 3000);
    return () => clearTimeout(fetchTimeoutRef.current);
  };

  /**
   * Submits the form with the user's input and sends it to the server
   * Stores the user's input in local storage
   * Calls handleSendData which sends the data to the server and displays a success or error message
   */
  const handleSubmit = () => {
    const usernameInputValue = document.querySelector('input[name="username"]').value;
    const newData = { username: usernameInputValue };
    localStorage.setItem('form', JSON.stringify(newData));
    setForm(newData);
    handleSendData(newData);
  };

  useEffect(() => {
    confirmQrTimekeeping();
    const storedFullName = JSON.parse(localStorage.getItem('form'));
    if (storedFullName) {
      setForm(storedFullName);
    }
  }, []);

  return (
    <>
      <MessageUI message={message} />
      <CardUI message={message} data={form} handleSubmit={handleSubmit} />
    </>
  );
}

export default TimekeepingFormPage;
