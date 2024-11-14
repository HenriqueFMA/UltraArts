import { firestore } from '../Screens/FireBase/firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';

interface PostData {
  content: string[];
  createdAt: Date;
  likes: number;
  postId: string;
  title: string;
  userId: string;
}

// Função para buscar um post específico no Firestore
export const getPost = async (postId: string): Promise<PostData | null> => {
  try {
    console.log(`Buscando post com ID: ${postId}`);
    const postRef = doc(collection(firestore, 'Posts'), postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      return {
        content: postData?.content || [],
<<<<<<< HEAD
        createdAt: postData?.createdAt?.toDate ? postData?.createdAt?.toDate() : new Date(), // Verifica se é um Timestamp
=======
        createdAt: postData?.createdAt?.toDate?.() || new Date(),
>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
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

