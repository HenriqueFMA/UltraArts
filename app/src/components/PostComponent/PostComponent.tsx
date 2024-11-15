import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPost } from '../../Data_Control/PostService';
import getUserProfile from '../../Data_Control/userServise';
import { styles } from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';


interface PostComponentProps {
  postId: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ postId }) => {
  const [isLikedVisible, setIsLikedVisible] = useState(false);

  const [post, setPost] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);



  const toggleLikeddVisibility = () => {
    setIsLikedVisible(!isLikedVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carrega o post
        const postData = await getPost(postId);
        setPost(postData);

        // Carrega os dados do usuário, se userId estiver disponível no post
        if (postData?.userId) {
          const userData = await getUserProfile(postData.userId);
          setUser(userData);
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
      {/* Exibe o perfil do usuário */}
      <View style={styles.userInfo}>
        {user?.profilePicture ? (
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.noProfileImageText}>Imagem não disponível</Text>
        )}
        <Text style={styles.username}>{user?.username || 'Usuário desconhecido'}</Text>
      </View>

      {/* Conteúdo do post com suporte a carrossel */}
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
        <View>
          <TouchableOpacity

            onPress={toggleLikeddVisibility}
          >
            <Text >
              {isLikedVisible ? <AntDesign name="heart" size={24} color="red" />  : <AntDesign name="hearto" size={24} color="black" /> 
              }
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBio}>
          <Text style={styles.username}>{user?.username || 'Usuário desconhecido'}</Text>
          <Text style={styles.title}>{post.title}</Text>
        </View>
        <Text style={styles.date}>
          Publicado em: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Data inválida'}
        </Text>
        <Text style={styles.likes}>Curtidas: {post.likes}</Text>
      </View>
    </View>
  );
};

export default PostComponent;
