import { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { styles } from './Style';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importando Firebase

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type RouteProps = RouteProp<RootStackParamList, 'Home'>;

const BarraNavegacao: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Armazena o uid do usuário autenticado
      } else {
        setUserId(null); // Caso o usuário não esteja autenticado
      }
    });

    return unsubscribe; // Limpeza do listener quando o componente desmontar
  }, []);

  const getColor = (routeName: string) => {
    return route.name === routeName ? 'blue' : 'black'; 
  };

  const handleUserPress = (userId: string) => {
    if (userId) {
      navigation.navigate('Profile', { otherUserId: userId });
      console.log('Usuário selecionado:', userId);
    } else {
      console.log('Erro: ID do usuário não encontrado');
    }
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Entypo name="home" size={24} color={getColor('Home')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Location')}>
        <Entypo name="location-pin" size={24} color={getColor('Location')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchUserProfileScreen')}>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop')}>
        <AntDesign name="shoppingcart" size={24} color={getColor('Shop')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleUserPress(userId ?? '')}>
        <FontAwesome5 name="user-alt" size={24} color={getColor('Profile')} />
      </TouchableOpacity>
    </View>
  );
};

export default BarraNavegacao;
