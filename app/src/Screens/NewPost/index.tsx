import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../../Data_Control/PostService'; // Ajuste o caminho conforme necessário
import { styles } from './style'; // Ajuste o caminho conforme necessário
import { auth } from "../FireBase/firebaseConfig"; // Ajuste o caminho conforme necessário

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    const userId = auth.currentUser?.uid; // Obtém o ID do usuário autenticado

    if (!userId) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    try {
      await createPost({ title, content: images }); // Passa os dados do post diretamente
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
