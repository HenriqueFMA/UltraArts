import { StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

export const styles=StyleSheet.create({
main:{
    flex: 1,
    backgroundColor:'#297ac9'
},

Header:{
    backgroundColor:'#297ac9',
    height:'15%',
},
Card:{
    flex:1,
    backgroundColor:'#ffff',
    borderTopLeftRadius: 55,
},
ButtonTresPontos:{
        height: 70, // Limita a altura do contêiner principal
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        marginLeft:'90%',
        bottom: 0,
        width:'10%' ,
        justifyContent:'space-around',
        

}
});