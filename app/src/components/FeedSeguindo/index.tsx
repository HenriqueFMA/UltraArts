
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import PostComponent from '../../components/PostComponent/PostComponent';
import getFollowingUsers from '../../Screens/Home'; // Sua função getFollowingUsers
import { fetchUserPostsList } from '../../Data_Control/PostService';
import styles from './styles';
import { firestore, auth } from "../../Screens/FireBase/firebaseConfig";

import { collection, getDocs } from 'firebase/firestore';
import { CurrentRenderContext } from '@react-navigation/native';
interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

interface PostComponentProps {
  postId: string;
  // other props
}

const FeedSeguindo: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = auth.currentUser?.uid;
  if(!userId){
    return <Text>Usuário não autenticado</Text>;
  }
  async function getFollowingUsers(userId: string) {
    try {
      const followingRef = collection(firestore , 'Follow', userId, 'Following');
      const followingSnapshot = await getDocs(followingRef);
  
      const followingIds = followingSnapshot.docs.map(doc => doc.id);
      console.log('Usuários seguidos:', followingIds);
      return followingIds;
    } catch (error) {
      console.error('Erro ao buscar usuários seguidos:', error);
      return [];
    }
  }
  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        // Passo 1: Obter IDs dos usuários seguidos
          const followingIds = await getFollowingUsers(userId);
          console.log('Usuários seguidos:', followingIds);

        // Passo 2: Buscar os posts de cada usuário seguido
        const allPostsPromises = followingIds.map(async (userId: string) => {
          const userPosts = await fetchUserPostsList(userId);
          return userPosts.map((post) => ({ ...post, userId })); // Adiciona o userId ao post
        });

        const allPosts = (await Promise.all(allPostsPromises)).flat();

        // Passo 3: Ordenar todos os posts por timestamp (mais recente primeiro)
        const sortedPosts = allPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        setPosts(sortedPosts); // Atualiza o estado com os posts ordenados
      } catch (error) {
        console.error('Erro ao carregar posts dos usuários seguidos:', error);
      } finally {
        setLoading(false); // Marca como carregamento concluído
      }
    };

    fetchFollowingPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : posts.length === 0 ? (
          <Text>Você ainda não segue ninguém ou não há posts para exibir.</Text>
        ) : (
          posts.map((post) => (
            <PostComponent key={post.id} postId={post.id} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default FeedSeguindo;


