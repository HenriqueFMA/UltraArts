import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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