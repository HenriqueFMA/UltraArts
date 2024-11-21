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
    return { success: false, message: `An error occurred: ${(error as Error).message}` };
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
export const searchUserProfileByUsername = async (username: string) => {
  try {
    console.log(`Buscando perfil com Username: ${username}`);
    
    // Consulta ao Firestore para encontrar o usuário pelo Username
    const userRef = query(collection(firestore, 'Users'), where('Username', '==', username));
    const userDocs = await getDocs(userRef);

    // Verifica se encontrou algum documento
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
      console.log("Perfil com o Username especificado não foi encontrado.");
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar perfil pelo Username:', error);
    throw new Error('Erro ao buscar o perfil do usuário.');
  }
};



/**
 * Obtém a contagem de seguidores de um usuário.
 * 
 * @param userId - ID do usuário cuja contagem de seguidores será buscada.
 * @returns Número de seguidores do usuário.
 */
export const getFollowersCount = async (userId: string): Promise<number> => {
  try {
    // Referência à subcoleção "Followers" do usuário
    const followersRef = collection(firestore, `Users/${userId}/Followers`);

    // Obtem todos os documentos na subcoleção
    const followersSnapshot = await getDocs(followersRef);

    // Retorna o número de seguidores
    return followersSnapshot.size;
  } catch (error) {
    console.error("Erro ao obter contagem de seguidores:", error);
    return 0;
  }
};
 
export const getFollowingList = async (userId: string): Promise<string[]> => {
  try {
    const followingRef = collection(firestore, `Users/${userId}/Following`);
    const followingSnapshot = await getDocs(followingRef);

    const followingList: string[] = [];
    followingSnapshot.forEach((doc) => {
      followingList.push(doc.id); // ID de cada usuário seguido
    });

    return followingList;
  } catch (error) {
    console.error("Erro ao obter a lista de usuários que está seguindo:", error);
    return [];
  }
};
/**
 * Obtém a lista de IDs dos seguidores de um usuário.
 *
 * @param userId - ID do usuário cujos seguidores serão buscados.
 * @returns Lista de IDs dos seguidores.
 */
export const getFollowersList = async (userId: string): Promise<string[]> => {
  try {
    const followersRef = collection(firestore, `Users/${userId}/Followers`);
    const followersSnapshot = await getDocs(followersRef);

    const followersList: string[] = [];
    followersSnapshot.forEach((doc) => {
      followersList.push(doc.id); // ID de cada seguidor
    });

    return followersList;
  } catch (error) {
    console.error("Erro ao obter a lista de seguidores:", error);
    return [];
  }
};
/**
 * Obtém a contagem de usuários que o usuário está seguindo.
 *
 * @param userId - ID do usuário cuja contagem de "seguindo" será buscada.
 * @returns Número de usuários que o usuário está seguindo.
 */
export const getFollowingCount = async (userId: string): Promise<number> => {
  try {
    // Referência à subcoleção "Following" do usuário
    const followingRef = collection(firestore, `Users/${userId}/Following`);

    // Obtem todos os documentos na subcoleção
    const followingSnapshot = await getDocs(followingRef);

    // Retorna o número de usuários seguidos
    return followingSnapshot.size;
  } catch (error) {
    console.error("Erro ao obter contagem de seguindo:", error);
    return 0;
  }
};

