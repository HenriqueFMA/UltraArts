import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#297ac9",
  },
  cabecario: {
    height: 75,
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
    height: "100%",
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
  navigationButton: {
    backgroundColor: '#6200EE', // Cor de fundo do botão
    width: 40,                 // Largura do botão para deixá-lo circular
    height: 40,                // Altura igual à largura para formar um círculo
    borderRadius: 28,          // Bordas arredondadas (metade da largura e altura)
    alignItems: 'center',      // Alinha o conteúdo horizontalmente ao centro
    justifyContent: 'center',  // Alinha o conteúdo verticalmente ao centro
    position: 'absolute',      // Posição absoluta para sobrepor outros elementos
    bottom: 20,                // Distância da parte inferior da tela
    right: 20,                 // Distância da lateral direita da tela
    zIndex: 10,                // Coloca o botão em cima de outros elementos
    elevation: 5,              // Somente para Android: adiciona sombra para dar destaque
    shadowColor: 'black',      // Cor da sombra no iOS
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra no iOS
    shadowOpacity: 0.3,        // Opacidade da sombra no iOS
    shadowRadius: 3,           // Raio da sombra no iOS
    marginBottom: 60,          // Margem inferior para afastar do conteúdo abaixo
},

  navigationButtonText: {
    color: '#ffffff',           // Cor do texto
    fontSize: 16,               // Tamanho do texto
    fontWeight: 'bold',         // Peso da fonte
  },
  menuContainer: {
    position: 'absolute',
    top: 60, // Ajuste a posição vertical conforme necessário
    right: 10, // Ajuste a posição horizontal conforme necessário
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    zIndex: 10, // Garante que o menu fique sobreposto aos outros elementos
    // Sombra no Android
    elevation: 5,
    // Sombra no iOS
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  postsContainer: {
    marginTop: 20,
    paddingHorizontal: 5,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postsGrid: {
    width: '33%', // Garante que cada item no grid ocupe um terço da tela
    padding: 5,
  },
  postImage: {
    width: '100%', // Usa a largura completa do contêiner pai (postsGrid)
    aspectRatio: 1, // Mantém a proporção 1:1 (quadrado)
    borderRadius: 5,
  },
  
    noPostsText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
    },
  
 
});