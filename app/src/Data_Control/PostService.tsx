import { db, storage, auth } from "../Screens/FireBase/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Definindo a interface para os dados do post
interface PostData {
  id?: string;
  userId: string;
  title: string;
  content: string[];
  createdAt?: string;
  likes?: number;
}

// Função para fazer upload de uma imagem para o Firebase Storage
// No arquivo PostService.tsx
export const uploadImage = async (userId: string, imageUri: string): Promise<string> => {
  console.log(`Iniciando upload da imagem para o usuário ${userId} com URI: ${imageUri}`);
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const uniqueName = `${userId}_${Date.now()}`;
  const storageRef = ref(storage, `images/${userId}/${uniqueName}`);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  console.log(`Imagem carregada com sucesso: ${downloadURL}`);
  return downloadURL;
};

// Função para criar um novo post
export const createPost = async (postData: Omit<PostData, 'id'>) => {
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
    const docRef = await addDoc(collection(db, "Posts"), {
      ...postData,
      userId,
      createdAt: new Date().toISOString(),
      likes: postData.likes || 0,
    });
    console.log("Post criado com sucesso com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao criar post:", error);
  }
};

// Função para obter todos os posts
export const getPosts = async (): Promise<PostData[] | null> => {
  console.log("Iniciando busca de todos os posts.");
  try {
    const querySnapshot = await getDocs(collection(db, "Posts"));
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
    const postRef = doc(db, "Posts", postId);
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
    const postRef = doc(db, "Posts", postId);
    await deleteDoc(postRef);
    console.log("Post deletado com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar post:", error);
  }
};
