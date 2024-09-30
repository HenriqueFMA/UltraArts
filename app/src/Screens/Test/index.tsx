import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import useAuth from '../../Hooks/useAuth'; // Hook para autenticação
import BarraNegacao from '../../components/BarraDeNavegaca/Index';
import { NavigationProp } from '@react-navigation/native'; // Importando NavigationProp

// Definindo os tipos para as props
interface CreatePostScreenProps {
  navigation: NavigationProp<any>; // Use `any` ou defina um tipo mais específico se necessário
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ navigation }) => { // Adicionando `navigation` como prop
  const { user } = useAuth(); // Obtém os dados do usuário autenticado
  const [postText, setPostText] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!postText || !tag) {
      alert('Preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore();
      const postRef = collection(db, `Users/${user?.uid}/Posts`); // Inserindo o post na subcoleção de Posts do usuário
      await addDoc(postRef, {
        ID_USER: user?.uid, // ID do usuário obtido do hook
        postText,
        TAG: tag,
        curtidas: 0,
        comentarios: [], // Inicializa um array vazio de comentários
        createdAt: new Date(), // Timestamp para a criação do post
      });
      setPostText('');
      setTag('');
      alert('Post criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar o post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Texto do Post:</Text>
      <TextInput
        style={styles.input}
        value={postText}
        onChangeText={setPostText}
        placeholder="Digite o conteúdo do post"
      />
      <Text style={styles.label}>TAG:</Text>
      <TextInput
        style={styles.input}
        value={tag}
        onChangeText={setTag}
        placeholder="Digite uma TAG"
      />
      <Button title={loading ? 'Enviando...' : 'Criar Post'} onPress={handleCreatePost} disabled={loading} />
      <BarraNegacao navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default CreatePostScreen;
