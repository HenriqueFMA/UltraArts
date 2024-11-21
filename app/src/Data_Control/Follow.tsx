import { doc, getDoc, setDoc, deleteDoc,getFirestore, collection} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importa o Firebase Auth
import { firestore } from '../Screens/FireBase/firebaseConfig'; // Importa a configuração do Firebase



async function toggleFollow(followingId: string): Promise<string | void> {
    try {
        // Verifica se o ID do usuário a ser seguido é válido
        if (!followingId || typeof followingId !== 'string') {
            console.error('Erro: ID inválido para o usuário a ser seguido.');
            return 'ID do usuário inválido.';
        }

        // Pega o ID do usuário autenticado
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error('Erro: Usuário não está autenticado!');
            return 'Usuário não autenticado.';
        }

        const followerId = currentUser.uid; // ID do seguidor (quem está logado)

        // Referência ao documento na subcoleção "Followers" do usuário que será seguido
        const followRef = doc(firestore, `Users/${followingId}/Followers/${followerId}`);

        // Referência à subcoleção "Following" do usuário logado
        const userFollowingRef = doc(firestore, `Users/${followerId}/Following/${followingId}`);

        // Verifica se o seguidor já existe na lista de seguidores do usuário
        const docSnap = await getDoc(followRef);

        if (docSnap.exists()) {
            // Caso o seguidor já exista, remove (unfollow)
            await deleteDoc(followRef);
            await deleteDoc(userFollowingRef);
            console.log('Você deixou de seguir este usuário.');
            return 'Você deixou de seguir este usuário.';
        } else {
            // Caso o seguidor não exista, adiciona (follow)
            const timestamp = new Date().toISOString(); // Data padronizada

            await setDoc(followRef, {
                followerId: followerId,
                followedAt: timestamp,
            });

            await setDoc(userFollowingRef, {
                followingId: followingId,
                followedAt: timestamp,
            });

            console.log('Você está seguindo este usuário.');
            return 'Você está seguindo este usuário.';
        }
    } catch (error) {
        console.error('Erro ao acessar o Firestore:', error);
        return 'Erro ao executar a ação de seguir/deixar de seguir.';
    }
}

export { toggleFollow };


const db = getFirestore(); // Renomeie para `db` para evitar conflitos

export const checkIfUserIsFollowing = async (currentUserId: string, otherUserId: string): Promise<boolean> => {
    try {
      // Referência ao documento na subcoleção "Following" do usuário atual
      const userFollowingRef = doc(db, `Users/${currentUserId}/Following/${otherUserId}`);
      const followingDoc = await getDoc(userFollowingRef);
  
      // Verifica se o documento existe, ou seja, se o usuário atual está seguindo o outro usuário
      return followingDoc.exists();
    } catch (error) {
      console.error('Erro ao verificar seguimento:', error);
      return false;
    }
  };
  

