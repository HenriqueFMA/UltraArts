import { Text, View, TouchableOpacity } from "react-native";
import { styles } from './style';
import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import BarraNegacao from '../../components/BarraDeNavegaca/Index';
import Feather from '@expo/vector-icons/Feather';


const Profile: React.FC = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.main}>
        <View style={styles.Header}>
            <TouchableOpacity style={styles.ButtonTresPontos}>
            <Feather name="more-vertical" size={30} color="black" />
            </TouchableOpacity>

        </View>
        <View style={styles.Card}>

        </View>
      
      
      {/* Barra de navegação */}
      <BarraNegacao />
      {/* Outros conteúdos do perfil */}
    
    </View>
  );
};

export default Profile;
