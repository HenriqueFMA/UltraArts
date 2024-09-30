import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    main: {
        flexDirection: 'row', // Elementos na horizontal
        alignItems: 'center', // Alinhamento vertical centralizado
        height: 70, // Limita a altura do contêiner principal
        backgroundColor: '#d9d9d9',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 0,
        width:'100%' ,
        justifyContent:'space-around'
        
    },
    button: {
        padding: 25, // Aumenta a área clicável
        
        
      },
});