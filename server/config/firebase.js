const admin = require('firebase-admin');

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:', error.message);
  }
}

if (!serviceAccount) {
  try {
    serviceAccount = require('./firebase-service-account.js');
  } catch (error) {
    console.warn('Local firebase-service-account.js file not found. If this is a production environment, ensure the FIREBASE_SERVICE_ACCOUNT environment variable is set.');
  }
}

if (serviceAccount) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} else {
  console.error('Firebase Admin SDK was not initialized: No service account credentials found.');
}

module.exports = admin;
