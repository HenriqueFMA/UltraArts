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
    backgroundColor: '#fff',
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
    color: '#888',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#888',
    marginVertical: 1,
  },
  title: {
    fontSize: 14,
    marginVertical: 1,
    fontWeight:500,
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
  containerButton:{
    flexDirection: 'row', // Coloca os elementos lado a lado
    alignItems: 'center', // Alinha verticalmente
    gap: 10,

  }
});
