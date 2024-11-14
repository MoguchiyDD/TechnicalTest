import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { confirmQrTimekeeping, fetchQrTimekeeping } from '../../features/QrTimekeeping/api/qr';
import { QrCodeCanvasUI } from '../../widgets/ui/QrCodeCanvasUI';

function QrTimekeepingPage() {
  const [qrCode, setQrCode] = useState(null);
  const fetchIntervalRef = useRef(null);

  useEffect(() => {  // 1st loading + 10mins
    fetchQrTimekeeping().then(setQrCode);
    fetchIntervalRef.current = setInterval(() => {
      confirmQrTimekeeping().then(setQrCode)
    }, 10 * 60 * 1000);
    return () => clearInterval(fetchIntervalRef.current);
  }, []);

  useEffect(() => {  // WebSocket
    const socket = io('http://localhost:5000');
    socket.on('qrUpdated', (newQrCode) => {
      setQrCode(newQrCode);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <QrCodeCanvasUI value={qrCode} size={320} />
    </>
  );
}

export default QrTimekeepingPage;
