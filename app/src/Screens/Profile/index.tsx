import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from './style';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import BarraNegacao from '../../components/BarraDeNavegaca/Index';
import Feather from '@expo/vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Profile: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null); 
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Função para logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Função para selecionar a imagem
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('Usuário cancelou a seleção de imagem.');
        } else if (response.errorCode) {
          console.log('Erro: ', response.errorMessage);
          setError(response.errorMessage || 'Erro ao selecionar a imagem.');
        } else if (response.assets && response.assets[0]?.uri) {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      }
    );
  };

  // Função para fazer upload da imagem
  const uploadImage = async () => {
    if (!imageUri) {
      setError('Selecione uma imagem primeiro!');
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError('Usuário não autenticado!');
      return;
    }

    const fileName = `${userId}_profileImage.jpg`; 
    const storageRef = storage().ref(`profileImages/${fileName}`);

    setUploading(true);
    setTransferred(0);

    const task = storageRef.putFile(imageUri);

    // Monitorar o progresso do upload
    task.on('state_changed', snapshot => {
      setTransferred(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    });

    try {
      await task;
      const imageUrl = await storageRef.getDownloadURL(); // Obtém a URL da imagem

      // Atualizar o Firestore com a URL da imagem
      await firestore().collection('users').doc(userId).update({
        profilePicture: imageUrl,
      });

      setUploading(false);
      setUploadSuccess(true);
      console.log('Imagem enviada com sucesso e URL salva no Firestore!');
    } catch (error) {
      console.error('Erro ao fazer upload: ', error);
      setError('Erro ao fazer upload, tente novamente.');
      setUploading(false);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.ButtonTresPontos}>
          <Feather name="more-vertical" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.Card}>
        <TouchableOpacity onPress={selectImage}>
          <Text>Selecionar Imagem</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, marginTop: 10 }}
          />
        )}

        {uploading ? (
          <Text>Enviando imagem... {transferred}% concluído</Text>
        ) : (
          <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
            <Text>Fazer Upload da Imagem</Text>
          </TouchableOpacity>
        )}

        {uploadSuccess && <Text>Imagem enviada com sucesso!</Text>}
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      </View>

      {/* Barra de navegação */}
      <BarraNegacao />

      {/* Outros conteúdos do perfil */}
    </View>
  );
};

export default Profile;
