import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importação do Firebase Storage
import firebase from '@react-native-firebase/app';
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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializar a autenticação com persistência usando AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializar Firestore
export const db = getFirestore(app); // `db` será o Firestore do seu projeto
export const firestore = getFirestore(app);
// Inicializar Storage
export const storage = getStorage(app); // `storage` será o Firebase Storage do seu projeto

// Exporte a instância do Firebase para uso em outros arquivos, caso necessário
export { app as firebaseApp };