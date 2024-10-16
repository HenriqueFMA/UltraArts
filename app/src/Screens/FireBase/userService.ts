import { auth } from '../FireBase/firebaseConfig'; // ajuste o caminho conforme necessário
import firestore from '@react-native-firebase/firestore';

// Interface para os dados do usuário
interface UserData {
  uid: string;
  name: string;           
  dateOfBirth: string;    
  profilePicture: string;  
}

// Função para obter dados do usuário logado
export const getUserData = async (): Promise<UserData | null> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('Usuário não está logado');
    return null;
  }

  try {
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      return { uid: user.uid, ...userDoc.data() } as UserData;
    } else {
      console.log('Usuário não encontrado na coleção.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário: ', error);
    return null;
  }
};

// Função para obter o email do usuário
export const getUserEmail = async (): Promise<string | null> => {
  const user = auth.currentUser;
  return user ? user.email : null;
};

// Função para obter a imagem de perfil do usuário
export const getUserProfilePicture = async (): Promise<string | null> => {
  const userData = await getUserData();
  return userData ? userData.profilePicture : null;
};
