import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { getPost } from '../../Data_Control/PostService';
import getUserProfileUpdate from '../../Data_Control/userServise';
import styles from './stelys';

interface PostComponentProps {
  postId: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ postId }) => {
  const [post, setPost] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carrega o post
        const postData = await getPost(postId);
        setPost(postData);

        // Carrega os dados do usuário, se userId estiver disponível no post
        if (postData?.userId) {
          const userData = await getUserProfileUpdate(postData.userId);
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
        <Text style={styles.username}>
          {user?.username || 'Usuário desconhecido'}
        </Text>
      </View>
  
      {/* Conteúdo do post */}
      <Text style={styles.title}>{post.title}</Text>
      {post.content && post.content.length > 0 && (
        <Image source={{ uri: post.content[0] }} style={styles.image} />
      )}
      <Text style={styles.date}>
        Publicado em: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Data inválida'}
      </Text>
      <Text style={styles.likes}>Curtidas: {post.likes}</Text>
    </View>
  );
};

export default PostComponent;
