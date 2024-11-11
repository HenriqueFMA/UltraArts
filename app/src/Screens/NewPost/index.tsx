import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost, uploadImage } from '../../Data_Control/PostService'; // Certifique-se de importar a função de upload
import { styles } from './style'; // Ajuste o caminho conforme necessário
import { auth, firestore } from "../FireBase/firebaseConfig"; // Ajuste o caminho conforme necessário
import { doc } from 'firebase/firestore';

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = auth.currentUser?.uid;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const handleCreatePost = async () => {
    if (!title || images.length === 0) {
      setError('Por favor, insira um título e selecione pelo menos uma imagem.');
      return;
    }

    setLoading(true);
    setError('');

    const userId = auth.currentUser?.uid;

    if (!userId) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    try {
      const imageUrls: string[] = [];
      
      // Faz upload das imagens e armazena as URLs
      for (let imageUri of images) {
        const url = await uploadImage(userId, imageUri);
        if (url) {
          imageUrls.push(url);
        }
      }

      // Gera um ID único para o post
      const postId = doc(firestore, 'posts').id;

      // Agora, cria o post com as URLs das imagens, o userId e o postId
      const postData = {
        title,
        content: imageUrls,
        userId,
        postId, // ID único do post
      };

      await createPost(postData);

      setTitle('');
      setImages([]);
      alert('Post criado com sucesso!');
    } catch (error) {
      console.error("Erro ao criar post:", error);
      setError('Erro ao criar post. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do post"
      />

      <Button title="Selecionar Imagens" onPress={pickImage} />

      <View style={styles.imageContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.image} />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={handleCreatePost} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? 'Criando...' : 'Criar Post'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePostScreen;
