import { StyleSheet } from 'react-native'; 

// Definindo cores reutilizáveis
const colors = {
  primaryText: '#333',
  secondaryText: '#888',
  background: '#fff',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  noProfileImageText: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  carousel: {
    marginVertical: 10,
  },
  carouselImage: {
    width: 400,
    height: 400,
    borderRadius: 10,
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: colors.secondaryText,
    marginVertical: 1,
  },
  title: {
    fontSize: 14,
    marginVertical: 1,
    fontWeight: '500',
    color: colors.primaryText,
  },
  likes: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  containerInfoPost: {
    marginVertical: 10,
  },
  containerBio: {
    flexDirection: 'row', // Coloca os elementos lado a lado
    alignItems: 'center', // Alinha verticalmente
    marginVertical: 10,
    gap: 10,
  },
  containerButton: {
    flexDirection: 'row', // Coloca os elementos lado a lado
    alignItems: 'center', // Alinha verticalmente
    gap: 10,
  },

  // Estilos de comentários
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  commentsList: {
    marginTop: 10,
  },
  comment: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9', // Cor de fundo para os comentários
  },
  commentUser: {
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  commentText: {
    marginVertical: 5,
    color: colors.primaryText,
  },
  commentDate: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});
