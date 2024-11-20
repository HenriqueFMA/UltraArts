import { 
    doc, 
    getDoc, 
    setDoc, 
    deleteDoc, 
    collection, 
    getDocs, 
    addDoc 
} from 'firebase/firestore';
import { firestore } from '../../Screens/FireBase/firebaseConfig';

// Função para alternar o estado de um comentário (adicionar/remover)
async function toggleComment(postId: string, userId: string, commentText: string): Promise<void> {
    const commentRef = doc(firestore, `posts/${postId}/comments`, userId);
    const docSnap = await getDoc(commentRef);

    if (docSnap.exists()) {
        await deleteDoc(commentRef);
        console.log('Comentário removido');
    } else {
        await setDoc(commentRef, {
            userId: userId,
            commentText: commentText,
            createdAt: new Date()
        });
        console.log('Comentário adicionado');
    }
}

export { toggleComment };

// Função para obter todos os comentários de um post
async function getComments(postId: string): Promise<Array<{ userId: string; commentText: string; createdAt: Date }>> {
    const commentsCollectionRef = collection(firestore, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(commentsCollectionRef);

    const comments = querySnapshot.docs.map(doc => ({
        userId: doc.data().userId,
        commentText: doc.data().commentText,
        createdAt: doc.data().createdAt.toDate(),
    }));

    return comments;
}

export { getComments };

// Função para adicionar um novo comentário
async function addComment(postId: string, userId: string, commentText: string): Promise<void> {
    const commentsCollectionRef = collection(firestore, `posts/${postId}/comments`);
    await addDoc(commentsCollectionRef, {
        userId: userId,
        commentText: commentText,
        createdAt: new Date(),
    });

    console.log('Novo comentário adicionado');
}

export { addComment };
