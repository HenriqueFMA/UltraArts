import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPost } from '../../Data_Control/PostService';
import getUserProfile from '../../Data_Control/userServise';
import { styles } from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { toggleLike, getLikesCount, isUserLiked } from '../../Data_Control/Like';
import { auth } from '../../Screens/FireBase/firebaseConfig';

interface PostComponentProps {
  postId: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ postId }) => {
  const [isLikedVisible, setIsLikedVisible] = useState(false);  // Exibe coração vermelho se curtido
  const [post, setPost] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Função que trata o clique para curtir/descurtir
  const handleToggleLike = async () => {
    try {
      const currentUserUid = auth.currentUser?.uid;  // UID do usuário autenticado
      if (currentUserUid) {
        await toggleLike(postId, currentUserUid);  // Alterna o estado de curtida
        const updatedLikesCount = await getLikesCount(postId);  // Atualiza a contagem de curtidas
        setPost((prevPost: any) => ({
          ...prevPost,
          likes: updatedLikesCount,  // Atualiza a contagem de curtidas
        }));
        setIsLikedVisible((prevState) => !prevState);  // Alterna a visibilidade do coração
      } else {
        console.error('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao atualizar curtida:', error);
    }
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    const fetchData = async () => {
      try {
        const postData = await getPost(postId);
        setPost(postData);

        // Verifica se o post foi encontrado
        if (postData?.userId) {
          const userData = await getUserProfile(postData.userId);
          setUser(userData);
        }

        // Carrega a contagem de curtidas do post
        const likesCount = await getLikesCount(postId);
        setPost((prevPost: any) => ({
          ...prevPost,
          likes: likesCount,  // Atualiza a contagem de curtidas
        }));

        // Verifica se o usuário já curtiu o post
        if (userId) {
          const liked = await isUserLiked(postId, userId);
          setIsLikedVisible(liked);  // Define se o post foi curtido ou não
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!post) {
    return <Text>Post não encontrado.</Text>;
  }

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {user?.profilePicture ? (
          <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        ) : (
          <Text style={styles.noProfileImageText}>Imagem não disponível</Text>
        )}
        <Text style={styles.username}>{user?.username || 'Usuário desconhecido'}</Text>
      </View>

      {post.content && post.content.length > 0 && (
        <FlatList
          data={post.content}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />
      )}

      <View style={styles.containerInfoPost}>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.containerButton} onPress={handleToggleLike}>
            <AntDesign
              name={isLikedVisible ? 'heart' : 'hearto'}  // Exibe o ícone de coração preenchido ou vazio
              size={24}
              color={isLikedVisible ? 'red' : 'black'}  // Cor do coração (vermelho se curtido)
            />
            <Text style={styles.likes}>{post.likes}</Text>  {/* Exibe a contagem de curtidas */}
          </TouchableOpacity>
        </View>
        <View style={styles.containerBio}>
          <Text style={styles.username}>{user?.username || 'Usuário desconhecido'}</Text>
          <Text style={styles.title}>{post.title}</Text>
        </View>
        <Text style={styles.date}>
          Publicado em: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Data inválida'}
        </Text>
      </View>
    </View>
  );
};

export default PostComponent;
