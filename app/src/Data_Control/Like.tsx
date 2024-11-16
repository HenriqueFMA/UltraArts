import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Screens/FireBase/firebaseConfig';

// Função para alternar o estado de curtida (curtir/descurtir)
async function toggleLike(postId: string, userId: string): Promise<void> {
    const likeRef = doc(firestore, `posts/${postId}/likes`, userId);
    const docSnap = await getDoc(likeRef);

    if (docSnap.exists()) {
        await deleteDoc(likeRef);
        console.log('Postagem descurtida');
    } else {
        await setDoc(likeRef, { 
            userId: userId,
            likedAt: new Date()
        });
        console.log('Postagem curtida');
    }
}

export { toggleLike };

// Função para obter a quantidade de curtidas de um post
async function getLikesCount(postId: string): Promise<number> {
    const likesCollectionRef = collection(firestore, `posts/${postId}/likes`);
    const likeDocs = await getDocs(likesCollectionRef);

    return likeDocs.size;
}

export { getLikesCount };

// Função para verificar se o usuário já curtiu o post
export const isUserLiked = async (postId: string, userId: string): Promise<boolean> => {
    // Verifica se o usuário já curtiu o post no banco de dados
    const likesRef = collection(firestore, `posts/${postId}/likes`);
    const snapshot = await getDocs(likesRef);  // Obtém todos os documentos da coleção de curtidas

    // Verifica se algum documento contém o userId do usuário
    const userLiked = snapshot.docs.some(doc => doc.data().userId === userId);

    return userLiked;
};
