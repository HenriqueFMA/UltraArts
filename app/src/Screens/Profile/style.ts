import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#297ac9',
  },

  Header: {
    backgroundColor: '#297ac9',
    height: '15%',
  },
  
  Card: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 55,
    padding: 20, // Adicionei um padding para melhor espaçamento
  },
  
  ButtonTresPontos: {
    height: 70, // Limita a altura do contêiner principal
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    marginLeft: '90%',
    bottom: 0,
    width: '10%',
    justifyContent: 'center', // Alinhamento centralizado
    alignItems: 'center', // Alinhamento centralizado
  },

  uploadButton: {
    marginTop: 20,
    backgroundColor: '#007bff', // Cor de fundo do botão
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center', // Alinhamento centralizado
  },

  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
