import { firestore,storage } from '../Screens/FireBase/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc,getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
export default getUserProfile;
export const getUserProfileUpdate = async (userId: string) => {
  try {
    console.log(`Buscando usuário com ID: ${userId}`);
    const userRef = query(collection(firestore, 'Users'), where('ID', '==', userId));
    const userDocs = await getDocs(userRef);

    if (!userDocs.empty) {
      const userData = userDocs.docs[0].data();
      return {
        username: userData.Username || '',
        profilePicture: userData.IMG_Profile || '',
        description: userData.Bio || '',

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




interface UpdateUserData {
  userId: string;
  bio?: string;
  username?: string;
  profileImage?: string;
}

export const updateUserProfile = async ({ userId, bio, username, profileImage }: UpdateUserData) => {
  try {
    console.log(`Buscando usuário com ID: ${userId}`);
    
    // Verificando a existência do usuário no Firestore
    const userRefQuery = query(collection(firestore, 'Users'), where('ID', '==', userId));
    const userDocs = await getDocs(userRefQuery);

    if (userDocs.empty) {
      console.log("Usuário não encontrado.");
      return { success: false, message: 'User not found' };
    }

    const userDocRef = userDocs.docs[0].ref;
    const currentData = userDocs.docs[0].data();
    const currentUsername = currentData.Username;

    const updates: { [key: string]: any } = {};

    // Verifica se o username foi alterado e se é único
    if (username && username !== currentUsername) {
      const usernameQuery = query(collection(firestore, 'Users'), where('Username', '==', username));
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        console.log("Nome de usuário já em uso.");
        return { success: false, message: 'Username already taken' };
      }

      updates.Username = username;
    }

    if (bio !== undefined) {
      updates.Bio = bio;
    }

    if (profileImage) {
      const profileImageUrl = await uploadProfileImage(userId, profileImage);
      updates.IMG_Profile = profileImageUrl;
    }

    // Atualiza o documento do usuário no Firestore
    await updateDoc(userDocRef, updates);
    console.log("Perfil atualizado com sucesso.");
    
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { success: false, message: `An error occurred: ${error.message}` };
  }
};

// Função de upload da imagem de perfil
export const uploadProfileImage = async (userId: string, profileImageUri: string): Promise<string> => {
  try {
    console.log(`Iniciando upload da imagem de perfil para o usuário ${userId} com URI: ${profileImageUri}`);
    
    // Fazendo o fetch da imagem a partir da URI
    const response = await fetch(profileImageUri);
    const blob = await response.blob();
    
    // Gerando um nome único para o arquivo de imagem
    const uniqueName = `profile_${userId}_${Date.now()}`;
    const profileImageRef = ref(storage, `profileImages/${userId}/${uniqueName}`);
    
    // Enviando a imagem para o Firebase Storage
    await uploadBytes(profileImageRef, blob);
    
    // Obtendo a URL de download da imagem
    const downloadURL = await getDownloadURL(profileImageRef);
    console.log(`Imagem de perfil carregada com sucesso: ${downloadURL}`);
    
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem de perfil:", error);
    throw new Error("Failed to upload profile image.");
  }
};
