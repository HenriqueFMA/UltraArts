import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getUserProfileUpdate, updateUserProfile, uploadProfileImage } from '../../Data_Control/userServise';
import { auth } from '../FireBase/firebaseConfig';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';



const UserProfile = () => {
  const navigation = useNavigation(); // Hook de navegação

  const userId = auth.currentUser?.uid;
  const [userData, setUserData] = useState({
    username: '',
    profilePicture: '',
    description: '',
    fullName: '',
  });
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const data = await getUserProfileUpdate(userId);
      if (data) {
        setUserData(data);
        setBio(data.description);
        setUsername(data.username);
        setProfileImage(data.profilePicture);
      }
    };
    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const profileImageUrl = profileImage
        ? await uploadProfileImage(userId, profileImage)
        : userData.profilePicture;

      const result = await updateUserProfile({
        userId,
        bio,
        username,
        profileImage: profileImageUrl,
      });

      Alert.alert(result.message);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity style={styles.Arrowbacksharp} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={40} color="black" />
        </TouchableOpacity>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50, marginLeft: "auto", marginRight: "auto", marginTop: 30 }} />
        ) : null}
        <Text style={{ fontSize: 18, marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>{userData.fullName}</Text>

        <Text style={{ marginTop: 20, fontSize: 28, marginLeft: "auto", marginRight: "auto" }}>Atualizar Informações</Text>
        <Text style={{
          marginTop: 20, fontSize: 18, marginLeft: 10,
        }}>Usuário :</Text>
        <TextInput
          style={styles.Input}
          value={username}
          onChangeText={setUsername}
          placeholder="Novo username"
        />
        <Text style={{
          marginTop: 20, fontSize: 18, marginLeft: 10,
        }}>Bio :</Text>
        <TextInput
          style={styles.Input}
          value={bio}
          onChangeText={setBio}
          placeholder="Nova bio"
        />

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Atualizar Perfil</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;
