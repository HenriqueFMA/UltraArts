import React from 'react';
import { View } from 'react-native';
import PostComponent from '../../components/Post/index'
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';

const Home: React.FC = () => {
  // Supondo que o postId seja fornecido de alguma forma (exemplo: de banco de dados ou navegação)
  const postId = "8I2LiDSur1C6UmFRHv7m";

  return (
    <View style={{ flex: 1 }}>
      <PostComponent postId={postId} />

      <BarraNavegacao />
    </View>
  );
};

export default Home;