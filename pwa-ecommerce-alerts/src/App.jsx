import { useState, useEffect } from 'react';

function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Capture install event
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("Install prompt ready");
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Install app
  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Install not available yet");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log("Install result:", outcome);
    setDeferredPrompt(null);
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("Not supported");
      return;
    }

    const status = await Notification.requestPermission();
    setPermission(status);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>PWA Deal Alerts</h1>

      {/* Install Button */}
      {deferredPrompt && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
      )}

      <p>Permission: {permission}</p>

      {permission !== 'granted' && (
        <button onClick={requestNotificationPermission}>
          Enable Notifications
        </button>
      )}
    </div>
  );
}

export default App;