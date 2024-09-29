import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function App() {
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
          <Text style={styles.textoBotao}>Editar perfil</Text>
        </TouchableOpacity>
        <View style={styles.icons2}>
          <MaterialCommunityIcons name="grid" size={24} color="black" />
          <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
          <FontAwesome6 name="bookmark" size={24} color="black" />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#297ac9",
  },
  cabecario: {
    height: 90,
    backgroundColor: "#297ac9",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  conteudo: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start", // Alinha os elementos no topo
    alignItems: "center",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 0,
  },
  texto: {
    fontSize: 16,
    color: "#000000",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
    marginTop: "5%",
  },
  nomeUsuario: {
    alignItems: "center", // Centraliza o conteúdo dentro da view
    marginBottom: 10, // Espaçamento abaixo do nome do usuário
  },
  textUsuario: {
    fontWeight: "bold",
    fontSize: 25,
  },
  imagemPerfil: {
    width: 100, // Largura da imagem
    height: 100, // Altura da imagem
    borderRadius: 50, // Para deixar a imagem circular
    marginTop: 5, // Espaço entre o texto e a imagem
  },
  segTexto: {
    flexDirection: "row",
    marginTop: 15,
    gap: 30,
  },
  seguidoresTexto: {
    fontWeight: "bold",
  },
  botaoPerfil: {
    marginTop: 40,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  textoBotao: {
    fontWeight: "bold",
  },
  icons2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    padding: 10,
    marginTop: "5%",
  },
});
