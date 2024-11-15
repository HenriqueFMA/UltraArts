import { StyleSheet } from 'react-native';

// Definindo cores reutilizáveis
const colors = {
  primaryText: '#333',
  secondaryText: '#888',
  background: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  noProfileImageText: {
    fontSize: 16,
    color: colors.secondaryText,
    fontStyle: 'italic',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryText,
    lineHeight: 24, // Melhora a legibilidade
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 12,
    lineHeight: 32, // Melhor espaçamento entre linhas
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: 8,
    lineHeight: 20, // Aumenta o espaçamento entre linhas para melhor legibilidade
  },
  likes: {
    fontSize: 16,
    color: colors.primaryText,
  },
});

export default styles;