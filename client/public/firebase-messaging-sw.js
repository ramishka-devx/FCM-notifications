// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAxbSfwQegLuQC0xR18aL-vwj339WgYMww",
  authDomain: "chat-alguidance.firebaseapp.com",
  projectId: "chat-alguidance",
  storageBucket: "chat-alguidance.firebasestorage.app",
  messagingSenderId: "826824343394",
  appId: "1:826824343394:web:ce415cc27a9b1dac20f63b",
  measurementId: "G-XZTBZ0NZ7W"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);
  self.registration.showNotification(payload.notification?.title || "New Notification", {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "/logo192.png",
    data: payload.data
  });
});
