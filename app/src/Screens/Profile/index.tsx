import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./style";
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import { getUserProfile } from '../../Data_Control/userServise';
import { useNetInfo } from '@react-native-community/netinfo';

interface UserData {
  username: string;
  profilePicture?: string;
  followers: number;
  following: number;
  description?: string;
  fullName: string;
}

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          const fetchedUserData = await getUserProfile(userId);
          if (fetchedUserData) {
            setUserData(fetchedUserData);
          } else {
            setError('Não foi possível encontrar os dados do usuário.');
          }
        } catch (error) {
          setError('Erro ao carregar os dados do usuário.');
        }
      } else {
        setError('Usuário não autenticado.');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Não foi possível encontrar o perfil do usuário.</Text>
      </View>
    );
  }

  if (!netInfo.isConnected) {
    return (
      <View style={styles.container}>
        <Text>Sem conexão com a internet. Tente novamente mais tarde.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecario}>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="message" size={24} color="white" style={{ marginRight: 15 }} />
          <AntDesign name="heart" size={24} color="white" style={{ marginRight: 10 }} />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>
      </View>
      <View style={styles.conteudo}>
        <View style={styles.nomeUsuario}>
          <Text style={styles.textUsuario}>{userData.username}</Text>
        </View>
        <Image
          source={
            userData.profilePicture
              ? { uri: userData.profilePicture }
              : require("../images/profilepic.png")
          }
          style={styles.imagemPerfil}
        />
        <Text style={{ fontWeight: 'bold' }}>Descrição</Text>
        <Text>{userData.description || "Informações não disponíveis"}</Text>
        <View style={styles.segTexto}>
          <Text style={styles.seguidoresTexto}>{userData.followers} Seguidores</Text>
          <Text style={styles.seguidoresTexto}>{userData.following} Seguindo</Text>
        </View>
        <TouchableOpacity style={styles.botaoPerfil} onPress={handleLogout}>
          <Text style={styles.textoBotao}>Editar perfil</Text>
        </TouchableOpacity>
        <View style={styles.icons2}>
          <MaterialCommunityIcons name="grid" size={24} color="black" />
          <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
          <FontAwesome6 name="bookmark" size={24} color="black" />
        </View>
      <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('NewPost')}>
  <Text style={styles.navigationButtonText}>Settings</Text>
</TouchableOpacity>
      </View>
      <BarraNavegacao />
    </View>
  );
};

export default Profile;
