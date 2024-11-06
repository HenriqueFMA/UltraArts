import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Screens/FireBase/firebaseConfig';

async function toggleLike(postId: string, userId: string): Promise<void> {

    const likeRef = doc(firestore , `posts/${postId}/likes`, userId);
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
export {toggleLike};


async function getLikesCount(postId: string): Promise<number> {
    const likesCollectionRef = collection(firestore, `posts/${postId}/likes`);
    const likeDocs = await getDocs(likesCollectionRef);

    return likeDocs.size;
}
export {getLikesCount};