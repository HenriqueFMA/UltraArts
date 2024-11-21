// src/screens/EventScreen/style.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
  },
  cabecario: {
    height: 75,
    backgroundColor: "#297ac9",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1, // Ocupa o espaço restante da tela
  },
  eventHeader: {
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  eventDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  map: {
    flex: 1,
    marginVertical: 16,
  },
  additionalInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  locationImage: {
    width: 120,
    height: 80,
    marginRight: 16,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  navContainer: {
    // Faz a barra de navegação ficar na parte inferior
    height: 60,
    backgroundColor: '#fff',
  },
});

export default styles;
