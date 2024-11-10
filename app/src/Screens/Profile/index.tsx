import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./style";
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import { getUserProfile } from '../../Data_Control/userServise'; // Importe a função getUserProfile
import { useNetInfo } from '@react-native-community/netinfo';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  
  // States para armazenar os dados do usuário
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Estado para erros

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Função para buscar os dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid; // Obtém o ID do usuário autenticado
      if (userId) {
        try {
          const fetchedUserData = await getUserProfile(userId); // Chama a função getUserProfile
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

  // Exibe a mensagem de erro ou de carregamento
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Caso haja erro ao carregar os dados
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Caso não encontre dados do usuário
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Não foi possível encontrar o perfil do usuário.</Text>
      </View>
    );
  }

  // Verifica se a rede está disponível
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
          <MaterialCommunityIcons
            name="message"
            size={24}
            color="white"
            style={{ marginRight: 15 }}
          />
          <AntDesign
            name="heart"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>
      </View>
      <View style={styles.conteudo}>
        <View style={styles.nomeUsuario}>
          <Text style={styles.textUsuario}>{userData.username}</Text> {/* Exibe o nome de usuário */}
        </View>
        <Image
          source={{ uri: userData.profilePicture || "../images/profilepic.png" }} // Usa a imagem do perfil
          style={styles.imagemPerfil}
        />
        <Text style={{ fontWeight: 'bold' }}>Descrição</Text>
        <Text>Informações</Text>
        <View style={styles.segTexto}>
          <Text style={styles.seguidoresTexto}>{userData.followers} Seguidores</Text> {/* Exibe o número de seguidores */}
          <Text style={styles.seguidoresTexto}>{userData.following} Seguindo</Text> {/* Exibe o número de seguindo */}
        </View>
        <TouchableOpacity style={styles.botaoPerfil} onPress={handleLogout}>
          <Text style={styles.textoBotao}>Editar perfil</Text>
        </TouchableOpacity>
        <View style={styles.icons2}>
          <MaterialCommunityIcons name="grid" size={24} color="black" />
          <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
          <FontAwesome6 name="bookmark" size={24} color="black" />
        </View>
      </View>
      <BarraNavegacao />
    </View>
  );
};

export default Profile;
