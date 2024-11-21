import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PostComponent from '../../components/PostComponent/PostComponent';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFollowingList } from '../../Data_Control/userServise'; // Importe a função de obter seguidores

type Post = {
  id: string;
  content: string;
  timestamp: Date;
  userId: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  
  const db = getFirestore();
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  const postId = "ID_DO_POST_ESPECIFICO"; // Substitua com o ID do post específico que você quer colocar no início

  // Função para buscar posts de múltiplos usuários
  const fetchUserPostsList = async (userIds: string[]) => {
    if (userIds.length === 0) return []; // Se não houver usuários, retorna lista vazia

    const posts: Post[] = [];
    const chunkSize = 10; // Limite de IDs para a consulta
    
    for (let i = 0; i < userIds.length; i += chunkSize) {
      const chunk = userIds.slice(i, i + chunkSize);
      const postsQuery = query(
        collection(db, 'Posts'),
        where('userId', 'in', chunk), // Filtra posts dos usuários
        orderBy('timestamp', 'desc')  // Ordena por data (mais recentes primeiro)
      );

      const postsSnapshot = await getDocs(postsQuery);
      const fetchedPosts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];

      posts.push(...fetchedPosts);  // Adiciona os posts recuperados
    }

    return posts;
  };

  // Função para organizar os posts
  const organizePosts = (fetchedPosts: Post[], postId: string) => {
    // Ordenar os posts por timestamp (do mais recente para o mais antigo)
    const sortedPosts = fetchedPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Colocar o post com o `postId` no início da lista, se encontrado
    const initialPostIndex = sortedPosts.findIndex(post => post.id === postId);
    if (initialPostIndex !== -1) {
      const [initialPost] = sortedPosts.splice(initialPostIndex, 1);
      sortedPosts.unshift(initialPost);
    }

    return sortedPosts;
  };

  // Função principal para buscar e organizar os posts
  const fetchPosts = async () => {
    try {
      if (currentUserId) {
        // Obter lista de seguidores (ou qualquer outra lista de usuários que você deseja buscar os posts)
        const followingIds = await getFollowingList(currentUserId);

        // Buscar posts dos usuários seguidos
        const fetchedPosts = await fetchUserPostsList([currentUserId, ...followingIds]); // Buscar os posts do usuário atual + os seguidos

        if (fetchedPosts.length === 0) {
          setLoading(false);
          return; // Se não houver posts, termina a execução
        }

        // Organizar os posts
        const sortedPosts = organizePosts(fetchedPosts, postId);

        setPosts(sortedPosts);  // Atualiza o estado com os posts organizados
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);  // Marca como carregamento concluído
    }
  };

  useEffect(() => {
    fetchPosts();  // Chama a função para buscar e organizar os posts
  }, [currentUserId, postId]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {loading ? (
          <Text>Carregando posts...</Text>
        ) : posts.length === 0 ? (
          <Text>Sem posts para exibir.</Text>
        ) : (
          posts.map(post => (
            <PostComponent key={post.id} postId={post.id} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
