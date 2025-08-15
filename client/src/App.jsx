import { useEffect } from "react";
import { requestNotificationPermission, listenForMessages } from "./services/notificationService";

function App() {
  useEffect(() => {
    async function setupNotifications() {
      const token = await requestNotificationPermission();
      if (token) {
        // Send this token to your backend to subscribe to a topic
        await fetch("http://localhost:3001/notifications/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, topic: "group_1" })
        });
      }
      listenForMessages();
    }
    setupNotifications();
  }, []);

  return <h1>Web Notifications Ready</h1>;
}

export default App;
