import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App;

if (getApps().length === 0) {
  // For development, we can use the Firebase emulator or a service account
  // For now, let's use the project ID directly for basic functionality
  adminApp = initializeApp({
    projectId: 'studio-734908800-a65ec',
    // In production, you would use a service account key:
    // credential: cert({
    //   projectId: process.env.FIREBASE_PROJECT_ID,
    //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    // })
  });
} else {
  adminApp = getApps()[0] as App;
}

const adminAuth = getAuth(adminApp);

export { adminApp, adminAuth };