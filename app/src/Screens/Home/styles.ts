import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  body: {


    flex: 1,
    backgroundColor: '#297ac9',

  },
  main:{
    
    backgroundColor: '#fff',
    borderTopLeftRadius: 55,
    gap: 17,
  },
  cabecario: {
    height: 75,
    backgroundColor: "#297ac9",
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
  },
  post: {
    marginTop: 10,
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
});

export default styles;
