import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Button, TextInput } from 'react-native';
import { getPost } from '../../Data_Control/PostService';
import getUserProfile from '../../Data_Control/userServise';
import { styles } from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { toggleLike, getLikesCount, isUserLiked } from '../../Data_Control/Like';
import { auth } from '../../Screens/FireBase/firebaseConfig';
import { addComment, getComments } from '../../Data_Control/Comments/Comments';
import { ScrollView } from 'react-native-gesture-handler';
interface PostComponentProps {
  postId: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ postId }) => {
  const [isLikedVisible, setIsLikedVisible] = useState(false); // Exibe coração vermelho se curtido
  const [isLikedVisible, setIsLikedVisible] = useState(false);  // Exibe coração vermelho se curtido
  const [isCommentVisible, setIsCommentVisible] = useState(false);  // Exibe balão de comentário se comentado
  const [post, setPost] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  

  const [newCommentText, setNewCommentText] = useState<string>('');
  
  // Função que trata o clique para curtir/descurtir
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
  const handleToggleComment = () => { 
    setIsCommentVisible((prevState) => !prevState);  // Alterna a visibilidade do balão de comentário
  }
  const newComment = async (commentText: string) => {
    try {
      const currentUserUid = auth.currentUser?.uid; // UID do usuário autenticado
      if (currentUserUid) {
        await addComment(postId, currentUserUid, commentText); // Alterna o estado do comentário
        const updatedComments = await getComments(postId); // Atualiza a lista de comentários
        setPost((prevPost: any) => ({
          ...prevPost,
          comments: updatedComments, // Atualiza os comentários
        }));
      } else {
        console.error('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao alternar comentário1111:', error);
    }
  };
  const renderComment = ({ item }: { item: { username: string; commentText: string; createdAt: Date } }) => (
    
    <View style={styles.comment}>
      <Text style={styles.commentUser}>{item.username}</Text>
      <Text style={styles.commentText}>{item.commentText}</Text>
      <Text style={styles.commentDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );
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
        const comments = await getComments(postId);
        setPost((prevPost: any) => ({
          ...prevPost,
          comments: comments,
        }));
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
      {/* Exibição do Post */}
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
          renderItem={({ item }: { item: string }) => (
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
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
          <TouchableOpacity style={styles.containerButton} onPress={handleToggleComment}>
            <AntDesign
              name={isCommentVisible ? 'file1' : 'filetext1'}  // Exibe o ícone de texto preenchido ou vazio
              size={24}
            />
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
      {/* Campo de comentário */}
      {isCommentVisible && (
        <View>
          <ScrollView>
          <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Adicione um comentário..."
            value={newCommentText}
            onChangeText={setNewCommentText} />
          <Button title="Comentar" onPress={() => newComment(newCommentText)} />
        </View><FlatList
            data={post.comments}
            renderItem={renderComment}
            keyExtractor={(item, index) => index.toString()}
            style={styles.commentsList} />
          </ScrollView>
          </View>
      )}
    </View>
  );
};

export default PostComponent;
