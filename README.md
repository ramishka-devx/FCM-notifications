# FCM Notifications Client

This project is a simple client for receiving push notifications using Firebase Cloud Messaging (FCM) in a web application. It is built with React and Vite.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Firebase Configuration](#firebase-configuration)
- [How to Use FCM Tokens to Send Messages](#how-to-use-fcm-tokens-to-send-messages)
- [Running the Project](#running-the-project)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Prerequisites
- Node.js (v16 or above recommended)
- npm (comes with Node.js)
- A Firebase project with Cloud Messaging enabled

## Setup
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd FCM-notifications/client
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. In the project settings, add a new web app and register it.
4. Copy the Firebase config object and replace the placeholder in your project (usually in `src/services/notificationService.js`).
5. Enable **Cloud Messaging** in the Firebase console.
6. Download your `firebase-messaging-sw.js` file and place it in the `public/` directory if needed.

## How to Use FCM Tokens to Send Messages

### 1. Get the FCM Token in the Client
- When the app loads, it requests notification permission and retrieves the FCM token using Firebase SDK.
- The token is usually logged in the browser console or can be sent to your backend for storage.

### 2. Send a Message Using the FCM Token
- You can send messages to a device using its FCM token via the Firebase Admin SDK or directly from the Firebase Console.

#### **Using Firebase Admin SDK (Node.js Example):**
```js
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

const message = {
  notification: {
    title: 'Hello',
    body: 'This is a test message',
  },
  token: '<FCM_TOKEN_FROM_CLIENT>',
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
```

#### **Using Firebase Console:**
- Go to Cloud Messaging > Send your first message.
- Enter the notification details.
- Under "Add FCM registration token", paste the token from your client.
- Send the message.

### 3. Handle Incoming Messages in the Client
- The client will receive and display notifications when the app is in the foreground or background (if service worker is set up correctly).

## Running the Project
```sh
npm run dev
```
- Open your browser at the local address shown in the terminal (usually http://localhost:5173/).

## Troubleshooting
- Make sure your Firebase config is correct.
- Ensure notification permissions are granted in the browser.
- Check the browser console for errors.
- Service worker (`firebase-messaging-sw.js`) must be in the `public/` directory.

## License
This project is licensed under the MIT License.
