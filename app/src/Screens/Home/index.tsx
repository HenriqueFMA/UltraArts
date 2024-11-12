import React from 'react';
import { View } from 'react-native';
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import PostComponent from '../../components/Post'; // Certifique-se de que o componente PostComponent existe
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  NewPost: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      {/* Exemplo de como passar o Id do post */}
      <PostComponent Id="8I2LiDSur1C6UmFRHv7m" />

      {/* Barra de Navegação */}
      <BarraNavegacao />
    </View>
  );
};

export default Home;
