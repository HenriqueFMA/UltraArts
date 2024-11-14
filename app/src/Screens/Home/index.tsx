import React from 'react';
import { View } from 'react-native';
<<<<<<< HEAD
import PostComponent from '../../components/Post/index'
=======
import PostComponent from '../../components/PostComponent/PostComponent'
>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
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

<<<<<<< HEAD
export default Home;
=======
export default Home;


>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
