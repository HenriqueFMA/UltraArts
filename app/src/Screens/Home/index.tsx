import React from 'react';
import { View } from 'react-native';
import PostComponent from '../../components/PostComponent/PostComponent'
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from "../FireBase/firebaseConfig";

import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { ScrollView } from 'react-native-gesture-handler';
import FeedSeguindo from '../../components/FeedSeguindo';

const userId = 'XNkqLeTYKucoLEhPI5tONuUUH2l2'; // Substitua pelo ID do usuário atual
  

const Home: React.FC = () => {
  // Supondo que o postId seja fornecido de alguma forma (exemplo: de banco de dados ou navegação)
  const postId = "ELhyR6x6Lg5yEfrMQfQW";

  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      <FeedSeguindo />
      </ScrollView>

      <BarraNavegacao />
    </View>
  );
};

export default Home;
