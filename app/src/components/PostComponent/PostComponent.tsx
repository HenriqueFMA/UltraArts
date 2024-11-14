import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { getPost } from '../../Data_Control/PostService';
import styles from './styles';

interface PostComponentProps {
  postId: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ postId }) => {
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPost(postId);
        setPost(postData);
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!post) {
    return <Text>Post não encontrado.</Text>;
  }

  return (
    <View style={styles.container}>
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
