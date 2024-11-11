import { firestore } from '../Screens/FireBase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getUserProfile = async (userId: string) => {
  try {
    console.log(`Buscando usuário com ID: ${userId}`);
    const userRef = query(collection(firestore, 'Users'), where('ID', '==', userId));
    const userDocs = await getDocs(userRef);

    if (!userDocs.empty) {
      const userData = userDocs.docs[0].data();
      return {
        username: userData.Username || '',
        profilePicture: userData.IMG_Profile || '',
        followers: userData.Followers || 0,
        following: userData.Following || 0,
        description: userData.Bio || '',
        fullName: userData.Nome_Completo || ''
      };
    } else {
      console.log("Não foi encontrado o documento do usuário");
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    throw new Error('Erro ao carregar os dados do usuário.');
  }
};
