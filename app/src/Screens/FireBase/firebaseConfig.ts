import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA-rPjih9Z0UhJLZMiL00uPwWIONz_IjQI',
  authDomain: 'database-ultraarts.firebaseapp.com',
  projectId: 'database-ultraarts',
  storageBucket: 'database-ultraarts.appspot.com',
  messagingSenderId: '613106689377',
  appId: '1:613106689377:android:a2515ff5e9152bc38e1120',
};

// Inicialize o Firebase apenas se ainda não estiver inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializar a autenticação com persistência usando AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };


