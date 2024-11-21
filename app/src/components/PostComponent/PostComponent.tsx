import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
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
  const [isLikedVisible, setIsLikedVisible] = useState(false); // Exibe coração vermelho se curtido
  const [post, setPost] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleToggleLike = async () => {
    try {
      const currentUserUid = auth.currentUser?.uid;
      if (currentUserUid) {
        await toggleLike(postId, currentUserUid);
        const updatedLikesCount = await getLikesCount(postId);
        setPost((prevPost: any) => ({
          ...prevPost,
          likes: updatedLikesCount,
        }));
        setIsLikedVisible((prevState) => !prevState);
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
      console.log('Carregando dados do post...');
      try {
        const postData = await getPost(postId);
        console.log('Dados do post carregados:', postData);
        setPost(postData);

        if (postData?.userId) {
          const userData = await getUserProfile(postData.userId);
          console.log('Dados do usuário carregados:', userData);
          setUser(userData);
        }

        const likesCount = await getLikesCount(postId);
        console.log('Contagem de curtidas carregada:', likesCount);
        setPost((prevPost: any) => ({
          ...prevPost,
          likes: likesCount,
        }));

        if (userId) {
          const liked = await isUserLiked(postId, userId);
          console.log(`O usuário já curtiu este post? ${liked}`);
          setIsLikedVisible(liked);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        console.log('Finalizado carregamento dos dados.');
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    console.log('Carregando...');
    return null; // Retorna nada enquanto carrega
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
              name={isLikedVisible ? 'heart' : 'hearto'}
              size={24}
              color={isLikedVisible ? 'red' : 'black'}
            />
            <Text style={styles.likes}>{post.likes}</Text>
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
