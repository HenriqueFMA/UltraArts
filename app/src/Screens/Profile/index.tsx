import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./style";
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import NewPost from '../NewPost';


const Profile: React.FC = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const handleLogout = async () => {
    await signOut(auth);
  };
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
          <Text style={styles.textUsuario}>Nome do usuário</Text>
        </View>
        <Image
          source={require("../images/profilepic.png")} // Caminho da sua imagem
          style={styles.imagemPerfil} // Aplicando estilo para a imagem
        />
        <Text style={{fontWeight:'bold'}}>Descrição</Text>
        <Text>Informações</Text>
        <View style={styles.segTexto}>
          <Text style={styles.seguidoresTexto}> X Seguidores</Text>
          <Text style={styles.seguidoresTexto}> X Seguindo</Text>
        </View>
        <TouchableOpacity style={styles.botaoPerfil}>
          <Text style={styles.textoBotao} onPress={handleLogout}>Editar perfil</Text>
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
}
export default Profile;
