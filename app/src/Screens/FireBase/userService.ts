import { auth } from './firebaseConfig'; // Ajuste o caminho conforme necessário
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
// Interface para os dados do usuário
interface UserData {
  uid: string;
  name: string;               // Nome_Completo
  dateOfBirth: string;        // Data_de_Nascimento
  profilePicture: string;     // IMG_Profile
  email: string;              // Email
  followers: number;          // Followers
  following: number;          // Following
  posts: number;              // N_Posts
  username: string | null;    // Username
}

// Função para obter dados do usuário baseado no userId
export const getUserData = async (userId: string): Promise<UserData | null> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('Usuário não está logado');
    return null;
  }

  try {
    const userDoc = await firestore().collection('users').doc(userId).get(); // Busca pelo userId fornecido
    if (userDoc.exists) {
      const data = userDoc.data();
      return {
        uid: userId, // Utilize o userId fornecido na chamada
        name: data?.Nome_Completo ?? '',
        dateOfBirth: data?.Data_de_Nascimento ?? '',
        profilePicture: data?.IMG_Profile ?? '',
        email: data?.Email ?? '',
        followers: data?.Followers ?? 0,
        following: data?.Following ?? 0,
        posts: data?.N_Posts ?? 0,
        username: data?.Username ?? null,
      } as UserData;
    } else {
      console.log('Usuário não encontrado na coleção.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário: ', error);
    return null;
  }
};

// Função para obter o email do usuário logado
export const getUserEmail = async (): Promise<string | null> => {
  const user = auth.currentUser;
  return user ? user.email : null;
};

// Função para obter a imagem de perfil do usuário
export const getUserProfilePicture = async (): Promise<string | null> => {
  const userData = await getUserData(auth.currentUser?.uid || ''); // Obtém o UID do usuário logado
  return userData ? userData.profilePicture : null;
};
