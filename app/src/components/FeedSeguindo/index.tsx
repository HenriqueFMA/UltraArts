import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import PostComponent from '../../components/PostComponent/PostComponent';
import { fetchUserPostsList } from '../../Data_Control/PostService';
import { firestore, auth } from "../../Screens/FireBase/firebaseConfig";
import { collection, onSnapshot } from 'firebase/firestore';

interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

const FeedSeguindo: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = auth.currentUser?.uid;

  if (!userId) {
    return <Text>Usuário não autenticado</Text>;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'Follow', userId, 'Following'),
      async (snapshot) => {
        try {
          const followingIds = snapshot.docs.map((doc) => doc.id);
          console.log('Usuários seguidos atualizados:', followingIds);

          // Buscar posts de cada usuário seguido
          const allPostsPromises = followingIds.map(async (userId: string) => {
            const userPosts = await fetchUserPostsList(userId);
            return userPosts.map((post) => ({ ...post, userId })); // Adiciona o userId ao post
          });

          const allPosts = (await Promise.all(allPostsPromises)).flat();

          // Ordenar todos os posts por timestamp (mais recente primeiro)
          const sortedPosts = allPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

          setPosts(sortedPosts); // Atualiza o estado com os posts ordenados
        } catch (error) {
          console.error('Erro ao carregar posts dos usuários seguidos:', error);
        } finally {
          setLoading(false); // Marca como carregamento concluído
        }
      },
      (error) => {
        console.error('Erro ao ouvir mudanças nos seguidores:', error);
      }
    );

    // Cleanup: Cancelar a assinatura quando o componente for desmontado
    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : posts.length === 0 ? (
          <Text>Você ainda não segue ninguém ou não há posts para exibir.</Text>
        ) : (
          posts.map((post) => <PostComponent key={post.id} postId={post.id} />)
        )}
      </ScrollView>
    </View>
  );
};

export default FeedSeguindo;
