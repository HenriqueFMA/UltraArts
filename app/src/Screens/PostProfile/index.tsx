import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text,TouchableOpacity } from 'react-native';
import PostComponent from '../../components/PostComponent/PostComponent';
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Data_Control/Types';
import { RouteProp } from '@react-navigation/native';
import { fetchUserPostsList } from '../../Data_Control/PostService';
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

type PostScreenRouteProp = RouteProp<RootStackParamList, 'PostProfile'>;

interface Post {
  id: string;
  content: string;
  timestamp: Date;
  // Outros atributos do post, se houver
}

const PostProfile: React.FC = () => {
  const route = useRoute<PostScreenRouteProp>();
  const { postId, userId } = route.params;
  const navigation = useNavigation(); // Hook de navegação
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Para exibir um carregamento

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchUserPostsList(userId);
        console.log('Posts carregados:', fetchedPosts); // Verificando se os posts estão sendo carregados

        // Ordenar os posts por timestamp (do mais recente para o mais antigo)
        const sortedPosts = fetchedPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        // Colocar o post com o `postId` no início da lista, se encontrado
        const initialPostIndex = sortedPosts.findIndex(post => post.id === postId);
        console.log('Index do post inicial:', initialPostIndex);
        if (initialPostIndex !== -1) {
          const [initialPost] = sortedPosts.splice(initialPostIndex, 1);
          sortedPosts.unshift(initialPost);
          console.log('Post inicial:', initialPost);
        }

        setPosts(sortedPosts);  // Atualiza o estado com os posts
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);  // Marca como carregamento concluído
      }
    };

    fetchPosts();
  }, [userId, postId]);

  return (
    <View style={{ flex: 1 }}>
       <TouchableOpacity style={styles.Arrowbacksharp} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
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

export default PostProfile;
