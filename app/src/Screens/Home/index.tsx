import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../FireBase/firebaseConfig';
import styles from './styles';
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import FeedSeguindo from '../../components/FeedSeguindo';

const Home: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate("Login");
  };

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <View style={styles.body}>
      <View style={styles.cabecario}>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="message" size={24} color="white" style={{ marginRight: 15 }} />
          <AntDesign name="heart" size={24} color="white" style={{ marginRight: 10 }} />
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
          >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
          {isMenuVisible && (
            <View style={styles.menuContainer}>
              {/* Removido isOwnProfile, pois não foi definido no código original */}
              <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
                <Text style={styles.menuItem}>Novo post</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.menuItem}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ScrollView style={styles.main}>
        <View style={styles.post}>
          <FeedSeguindo />
        </View>
      </ScrollView>
      <BarraNavegacao />
    </View>
  );
};

export default Home;
