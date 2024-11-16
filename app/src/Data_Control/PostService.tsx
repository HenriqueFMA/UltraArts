import { firestore, storage, auth } from "../Screens/FireBase/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc ,query, where} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Definindo a interface para os dados do post
interface PostData {
  id?: string;
  userId: string;
  title: string;
  content: string[];
  createdAt?: string | Date;
  likes?: number;
  postId?: string;
}

// Função para fazer upload de uma imagem para o Firebase Storage
export const uploadImage = async (userId: string, imageUri: string): Promise<string> => {
  console.log(`Iniciando upload da imagem para o usuário ${userId} com URI: ${imageUri}`);
  
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const uniqueName = `${userId}_${Date.now()}`;
    const storageRef = ref(storage, `images/${userId}/${uniqueName}`);
    
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`Imagem carregada com sucesso: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
};

// Função para criar um novo post com ID personalizado
export const createPost = async (postData: Omit<PostData, 'id'>, postId: string) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    console.error("Erro: Usuário não autenticado.");
    return;
  }

  if (!postData.title) {
    console.error("Erro: Título do post está ausente. Dados do post:", postData);
    return;
  }

  if (!postData.content || !Array.isArray(postData.content) || postData.content.length === 0) {
    console.error("Erro: Conteúdo do post está ausente ou inválido. postData:", postData);
    return;
  }

  try {
    const docRef = doc(collection(firestore, "Posts"), postId); // Definindo o ID personalizado
    await setDoc(docRef, {
      ...postData,
      userId,
      createdAt: new Date().toISOString(),
      likes: postData.likes || 0,
      postId, // Incluindo o campo postId no documento
    });
    console.log("Post criado com sucesso com ID:", postId);
  } catch (error) {
    console.error("Erro ao criar post:", error);
  }
};

// Função para obter todos os posts
export const getPosts = async (): Promise<PostData[] | null> => {
  console.log("Iniciando busca de todos os posts.");
  
  try {
    const querySnapshot = await getDocs(collection(firestore, "Posts"));
    const posts: PostData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PostData, 'id'>;
      posts.push({ id: doc.id, ...data });
    });
    
    console.log("Posts obtidos com sucesso:", posts);
    return posts;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return null;
  }
};

// Função para atualizar um post
export const updatePost = async (postId: string, updatedData: Partial<PostData>) => {
  console.log(`Iniciando atualização do post ${postId} com dados:`, updatedData);
  
  try {
    const postRef = doc(firestore, "Posts", postId);
    await updateDoc(postRef, updatedData);
    console.log("Post atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
  }
};

// Função para deletar um post
export const deletePost = async (postId: string) => {
  console.log(`Iniciando deleção do post ${postId}`);
  
  try {
    const postRef = doc(firestore, "Posts", postId);
    await deleteDoc(postRef);
    console.log("Post deletado com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar post:", error);
  }
};

// Função para obter um post específico
export const getPost = async (postId: string): Promise<PostData | null> => {
  if (!postId) {
    console.error('Erro: ID do post inválido');
    return null;
  }

  try {
    console.log(`Buscando post com ID: ${postId}`);
    const postRef = doc(collection(firestore, 'Posts'), postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      return {
        content: postData?.content || [],
        createdAt: postData?.createdAt?.toDate?.() || new Date(),
        likes: postData?.likes || 0,
        postId: postData?.postId || postId,
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
export const fetchUserPosts = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "Posts"));
    const userPosts = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return data.userId === userId ? { id: doc.id, ...data } : null;
      })
      .filter((post) => post !== null);

    return userPosts;
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    return [];
  }
};

export const fetchUserPostsList = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "Posts"));
    const userPosts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Verifica se a data do timestamp existe e converte para Data
      const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();  // Se não houver, usamos a data atual como fallback
      
      // Filtra os posts do usuário com o `userId` correspondente
      return data.userId === userId ? {
        id: doc.id,  // ID do post
        content: data.content || [],  // Conteúdo do post, garantindo que seja um array
        timestamp: timestamp,  // Converte timestamp para Data
        title: data.title || 'Sem título',  // Adiciona título (com fallback)
        likes: data.likes || 0  // Fallback para o número de likes
      } : null;
    }).filter((post) => post !== null);  // Filtra posts nulos

    console.log('Posts encontrados:', userPosts); // Verificando os posts encontrados
    return userPosts;  // Retorna a lista de posts do usuário
  } catch (error) {
    console.error('Erro ao buscar posts do usuário:', error);
    return [];  // Retorna uma lista vazia em caso de erro
  }
};

