import React from 'react';
import { View } from 'react-native';
import PostComponent from '../../components/PostComponent/PostComponent'

import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { ScrollView } from 'react-native-gesture-handler';

const Home: React.FC = () => {
  // Supondo que o postId seja fornecido de alguma forma (exemplo: de banco de dados ou navegação)
  const postId = "ELhyR6x6Lg5yEfrMQfQW";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      <PostComponent postId={postId} />
      </ScrollView>

      <BarraNavegacao />
    </View>
  );
};

export default Home;
