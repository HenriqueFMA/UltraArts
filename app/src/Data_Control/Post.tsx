import { firestore } from '../Screens/FireBase/firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';

export const getPost = async (postId: string) => {
  try {
    console.log(`Buscando post com ID: ${postId}`);
    const postRef = doc(collection(firestore, 'Posts'), postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      return {
        content: postData?.content || [],
        createdAt: postData?.createdAt?.toDate ? postData?.createdAt?.toDate() : new Date(), // Verifica se é um Timestamp
        likes: postData?.likes || 0,
        postId: postData?.postId || '',
        title: postData?.title || 'Sem título',
        userId: postData?.userId || ''
      };
    } else {
      console.log("Não foi encontrado o documento do post");
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter dados do post:', error);
    throw new Error('Erro ao carregar os dados do post.');
  }
};

