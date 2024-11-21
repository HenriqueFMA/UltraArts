import {
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    increment,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from '../Screens/FireBase/firebaseConfig';
import { useState } from 'react';

async function toggleFollow(followingId: string): Promise<string | void> {
    try {
        if (!followingId || typeof followingId !== 'string') {
            console.error('Erro: ID inválido para o usuário a ser seguido.');
            return 'ID do usuário inválido.';
        }

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error('Erro: Usuário não está autenticado!');
            return 'Usuário não autenticado.';
        }

        const followerId = currentUser.uid;

        // Referências de coleção e documentos
        const followRef = doc(firestore, `Follow/${followingId}/Followers/${followerId}`);
        const userFollowingRef = doc(firestore, `Follow/${followerId}/Following/${followingId}`);
        const usersCollectionRef = collection(firestore, 'Users');

        // Verifica se o seguidor já existe na lista de seguidores do usuário
        const docSnap = await getDoc(followRef);

        if (docSnap.exists()) {
            // Caso o seguidor já exista, remove (unfollow)
            await deleteDoc(followRef);
            await deleteDoc(userFollowingRef);

            // Atualiza os contadores de quem está seguindo
            const followerUserQuery = query(usersCollectionRef, where('ID', '==', followerId));
            const followingUserQuery = query(usersCollectionRef, where('ID', '==', followingId));

            const [followerSnapshot, followingSnapshot] = await Promise.all([
                getDocs(followerUserQuery),
                getDocs(followingUserQuery),
            ]);

            if (!followerSnapshot.empty) {
                const followerDocRef = followerSnapshot.docs[0].ref;
                await updateDoc(followerDocRef, {
                    FollowingNumber: increment(-1),
                });
            }

            if (!followingSnapshot.empty) {
                const followingDocRef = followingSnapshot.docs[0].ref;
                await updateDoc(followingDocRef, {
                    FollowerNumber: increment(-1),
                });
            }

            console.log('Usuário deixou de seguir.');
            return 'Você deixou de seguir este usuário.';
        } else {
            // Caso o seguidor não exista, adiciona (follow)
            const timestamp = new Date().toISOString();

            await setDoc(followRef, {
                followerId: followerId,
                followedAt: timestamp,
            });

            await setDoc(userFollowingRef, {
                followingId: followingId,
                followedAt: timestamp,
            });

            // Atualiza os contadores de quem está seguindo
            const followerUserQuery = query(usersCollectionRef, where('ID', '==', followerId));
            const followingUserQuery = query(usersCollectionRef, where('ID', '==', followingId));

            const [followerSnapshot, followingSnapshot] = await Promise.all([
                getDocs(followerUserQuery),
                getDocs(followingUserQuery),
            ]);

            if (!followerSnapshot.empty) {
                const followerDocRef = followerSnapshot.docs[0].ref;
                await updateDoc(followerDocRef, {
                    FollowingNumber: increment(1),
                });
            }

            if (!followingSnapshot.empty) {
                const followingDocRef = followingSnapshot.docs[0].ref;
                await updateDoc(followingDocRef, {
                    FollowerNumber: increment(1),
                });
            }

            console.log('Usuário está seguindo.');
            return 'Você está seguindo este usuário.';
        }
    } catch (error) {
        console.error('Erro ao acessar o Firestore:', error);
        return 'Erro ao executar a ação de seguir/deixar de seguir.';
    }
}

export { toggleFollow };

export const checkIfUserIsFollowing = async (
    currentUserId: string,
    otherUserId: string
): Promise<boolean> => {
    try {
        const userFollowingRef = doc(firestore, `Follow/${currentUserId}/Following/${otherUserId}`);
        const followingDoc = await getDoc(userFollowingRef);
        return followingDoc.exists(); // Retorna verdadeiro se o usuário está seguindo
    } catch (error) {
        console.error('Erro ao verificar seguimento:', error);
        return false;
    }
};

// Função para pegar a contagem de seguidores (FollowerNumber) de um usuário
interface UserData {
    FollowerNumber?: number;
}

export const getFollowerNumber = async (userId: string): Promise<number> => {
    try {
      // Realiza a consulta na coleção 'Users' procurando pelo campo 'ID'
      const userQuery = query(
        collection(firestore, 'Users'),
        where('ID', '==', userId) // Filtra pelo campo 'ID' do usuário
      );
      const querySnapshot = await getDocs(userQuery);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Pega o primeiro (único) resultado da consulta
        const userData = userDoc.data() as UserData;
        const followerNumber = userData.FollowerNumber || 0; // Acessa o campo 'FollowerNumber'
        return followerNumber;
      } else {
        console.error('Usuário não encontrado');
        return 0;
      }
    } catch (error) {
      console.error('Erro ao obter o número de seguidores:', error);
      return 0;
    }
  };
  
  // Função para pegar a contagem de pessoas seguidas (FollowingNumber) de um usuário
  export const getFollowingNumber = async (userId: string) => {
    try {
      // Realiza a consulta na coleção 'Users' procurando pelo campo 'ID'
      const userQuery = query(
        collection(firestore, 'Users'),
        where('ID', '==', userId) // Filtra pelo campo 'ID' do usuário
      );
      const querySnapshot = await getDocs(userQuery);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Pega o primeiro (único) resultado da consulta
        const followingNumber = userDoc.data()?.FollowingNumber || 0; // Acessa o campo 'FollowingNumber'
        return followingNumber;
      } else {
        console.error('Usuário não encontrado');
        return 0;
      }
    } catch (error) {
      console.error('Erro ao obter o número de seguidos:', error);
      return 0;
    }
  };
  