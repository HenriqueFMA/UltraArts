import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute,RouteProp } from '@react-navigation/native'; 
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { styles } from './Style';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: { id: number };
  Profile: undefined;
  Cart: undefined;
  Location: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type RouteProps = RouteProp<RootStackParamList, 'Home'>;

const BarraNavegacao: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const getColor = (routeName: string) => {
    return route.name === routeName ? 'blue' : 'black'; 
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Entypo name="home" size={24} color={getColor('Home')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Location')}>
        <Entypo name="location-pin" size={24} color={getColor('Location')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
      <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
        <AntDesign name="shoppingcart" size={24} color={getColor('Cart')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <FontAwesome5 name="user-alt" size={24} color={getColor('Profile')} />
      </TouchableOpacity>
    </View>
  );
};

export default BarraNavegacao;
