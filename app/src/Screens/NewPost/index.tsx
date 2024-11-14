import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost, uploadImage } from '../../Data_Control/PostService';
import { styles } from './style'; // Caminho ajustado para o novo arquivo de estilos padronizado
import { auth, firestore } from "../FireBase/firebaseConfig";
import { collection, doc } from 'firebase/firestore';
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation(); // Hook de navegação


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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

    if (!userId) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    try {
      const imageUrls: string[] = [];

      for (const imageUri of images) {
        const url = await uploadImage(userId, imageUri);
        if (url) {
          imageUrls.push(url);
        }
      }

      const postId = doc(collection(firestore, 'posts')).id;

      const postData = {
        title,
        content: imageUrls,
        userId,
      };

      await createPost(postData, postId);

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
       <TouchableOpacity style={styles.Arrowbacksharp} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
      <Text style={styles.label}>Discrição</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite a discrição do post"
      />

<TouchableOpacity style={styles.button} onPress={pickImage}>
  <Text style={styles.buttonText}>Selecionar Imagens</Text>
</TouchableOpacity>

      <View style={styles.imageContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.image} />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={handleCreatePost} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Criar Post</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePostScreen;
