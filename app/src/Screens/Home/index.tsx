import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../FireBase/firebaseConfig';
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import PostComponent from '../../components/Post'
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
      
        <PostComponent Id="BPhywjA1uwbYIVxFWRZATtGQruF2"
/>
   

      

      <BarraNavegacao />
    </View>
  );
};

export default Home;