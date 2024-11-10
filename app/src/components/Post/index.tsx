import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { styles } from './stelys';

// Interface para os dados do usuário
interface UserData {
  username: string | null;
  profilePicture: string;
}

// Interface para os dados do post
interface PostData {
  userId: string;
  title: string;
  content: string[]; // URLs das imagens do post
  createdAt: Date;
}

interface PostComponentProps {
  Id: string; // O ID do post que queremos exibir
}

const PostComponent: React.FC<PostComponentProps> = ({ Id }) => {
  const [postData, setPostData] = useState<PostData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do post
  const fetchPostData = async (postId: string): Promise<PostData | null> => {
    try {
      const postDoc = await firebase.firestore().collection('posts').doc(postId).get();
      if (postDoc.exists) {
        const data = postDoc.data();
        return {
          userId: data?.userId ?? '',
          title: data?.title ?? 'Sem título',
          content: data?.content ?? [],
          createdAt: data?.createdAt?.toDate() ?? new Date(),
        };
      }
    } catch (error) {
      console.error("Erro ao obter dados do post:", error);
    }
    return null;
  };

  // Função para buscar os dados do usuário
  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const userDoc = await firebase.firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const data = userDoc.data();
        return {
          username: data?.username ?? 'Usuário desconhecido',
          profilePicture: data?.profilePicture ?? 'https://via.placeholder.com/150',
        };
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
    return null;
  };

  // useEffect para buscar os dados do post e do usuário
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const post = await fetchPostData(Id); // Usando o Id recebido via props
      if (post) {
        setPostData(post);
        const user = await fetchUserData(post.userId);
        setUserData(user);
      }
      setLoading(false);
    };
    fetchData();
  }, [Id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!postData || !userData) {
    return <Text>Dados do post ou do usuário não encontrados.</Text>;
  }

  return (
    <View style={styles.postContainer}>
      {/* Header com Foto e Nome do Usuário */}
      <View style={styles.postHeader}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
        <Text style={styles.username}>{userData.username}</Text>
      </View>

      {/* Imagens do Post */}
      <ScrollView horizontal pagingEnabled style={styles.imageCarousel}>
        {postData.content.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.postImage} />
        ))}
      </ScrollView>

      {/* Descrição e Data */}
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{postData.title}</Text>
        <Text style={styles.postDate}>{postData.createdAt.toLocaleDateString()}</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtons}>
        <TouchableOpacity accessible accessibilityLabel="Curtir">
          <FontAwesome name="heart-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity accessible accessibilityLabel="Comentar">
          <FontAwesome name="comment-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity accessible accessibilityLabel="Compartilhar">
          <FontAwesome name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComponent;
