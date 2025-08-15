import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config from your console
const firebaseConfig = {
   apiKey: "AIzaSyAxbSfwQegLuQC0xR18aL-vwj339WgYMww",
  authDomain: "chat-alguidance.firebaseapp.com",
  projectId: "chat-alguidance",
  storageBucket: "chat-alguidance.firebasestorage.app",
  messagingSenderId: "826824343394",
  appId: "1:826824343394:web:ce415cc27a9b1dac20f63b",
  measurementId: "G-XZTBZ0NZ7W"
};

// Init
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Permission not granted for notifications");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BM7aGD15uiXySyd7iEEfCH_Oci_Qe3ezyhdpaoeC5aTGqpVxO363UQg5S5R5txj9GS_TNUiKQLpcNfbzu9HYSOk",
    });

    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
}

// Foreground message listener
export function listenForMessages() {
  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);

    if (Notification.permission === "granted") {
      new Notification(payload.notification?.title || "New Notification", {
        body: payload.notification?.body || "",
        icon: payload.notification?.icon || "/logo192.png",
        data: payload.data,
      });
    }
  });
}
