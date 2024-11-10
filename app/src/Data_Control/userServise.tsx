import { firestore } from '../Screens/FireBase/firebaseConfig'; // Importe o firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';


export const getUserProfile = async (userId: string) => {
  try {
    console.log(`Buscando usuário com ID: ${userId}`); // Adicione esse log para verificar o userId
    const userRef = doc(firestore, 'Users', userId); // Referência para o documento do usuário
    const userDoc = await getDoc(userRef); // Busca os dados do usuário

    if (userDoc.exists()) {
      return userDoc.data(); // Retorna os dados do usuário
    } else {
      console.log("Não foi encontrado o documento do usuário");
      return null; // Caso o documento não exista
    }
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    throw new Error('Erro ao carregar os dados do usuário.');
  }
};
