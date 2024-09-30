import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import Post from '../../components/Post';
import BarraNegacao from '../../components/BarraDeNavegaca/Index';
import { useNavigation } from '@react-navigation/native'; // Import do hook de navegação

const Home: React.FC = () => {
  const navigation = useNavigation(); // Usando o hook de navegação

  const handleLogout = async () => {
    await signOut(auth);
  };

  const postId = '12345';

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.ButtonEntrar} onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
      
      
      <BarraNegacao />
    </View>
  );
};

export default Home;
