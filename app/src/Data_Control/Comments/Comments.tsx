import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, addDoc, query, where, Firestore } from 'firebase/firestore';
import { firestore } from '../../Screens/FireBase/firebaseConfig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

  interface Comment {
    userId: string;
    commentText: string;
    username: string;
    createdAt: Date;
  }
  




interface User {
  ID: string;
  Username: string;
  // ... outros campos
}

async function getUserByUsername(firestore: Firestore, id: string): Promise<string | null> {
  try {
    const usersRef = collection(firestore, 'Users');
    const q = query(usersRef, where('ID', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data() as User;
      return user.Username;
    } else {
      console.log('Usuário não encontrado');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}
  // Import statements (unchanged)

  
  // Function to toggle comment state (**not recommended for adding comments**)
  async function toggleComment(postId: string, userId: string, commentText: string): Promise<void> {
    const commentRef = doc(firestore, `posts/${postId}/comments`);
    const docSnap = await getDoc(commentRef);
    // ... (rest of the logic for toggling comment state, if needed)
  }
  
  export { toggleComment };
  
  // Function to get all comments for a post
  async function getComments(postId: string): Promise<Comment[]> {
    const commentsCollectionRef = collection(firestore, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(commentsCollectionRef);
  
    const comments = querySnapshot.docs.map(doc => ({
      userId: doc.data().userId,
      username: doc.data().username || '', // Handle potential missing username
      commentText: doc.data().commentText,
      createdAt: doc.data().createdAt.toDate(),
    })) as Comment[]; // Type assertion for Comment array
  
    return comments;
  }
  
  export { getComments };
  
  // Function to add a new comment
  async function addComment(postId: string, userId: string, commentText: string): Promise<void> {
    const username = await getUserByUsername(firestore, userId);
  
    const commentsCollectionRef = collection(firestore, `posts/${postId}/comments`);
    try{
        await addDoc(commentsCollectionRef, {
            userId: userId,
            commentText: commentText,
            username: username,
            createdAt: new Date(),
          } as Comment);
          console.log('Comentário adicionado com sucesso');
    }catch (error){
        console.error('Erro ao adicionar comentário:', error);
    }
  }
  export { addComment };
