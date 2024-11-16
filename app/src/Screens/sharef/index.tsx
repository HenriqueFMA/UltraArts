import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { firestore } from '../FireBase/firebaseConfig';
import { collection, query, getDocs, orderBy, startAt, endAt } from 'firebase/firestore';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação
import { RootStackParamList } from '../../Data_Control/Types'; // Importando a tipagem de navegação
import { StackNavigationProp } from '@react-navigation/stack'; // Importando a tipagem de navegação

const UserSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState<any[]>([]);

  // Tipando o hook de navegação
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'UserSearch'>>(); 

  const handleSearch = async (text: string) => {
    setSearchText(text);

    if (text.length === 0) {
      setUserList([]);
      return;
    }

    try {
      // Consulta Firestore para buscar usuários cujo nome começa com o texto digitado
      const usersRef = collection(firestore, 'Users');
      const userQuery = query(
        usersRef,
        orderBy('Username'),
        startAt(text),
        endAt(text + '\uf8ff')
      );
      const querySnapshot = await getDocs(userQuery);

      const users = querySnapshot.docs.map((doc) => ({
        ID: doc.data().ID, // Usando o campo ID
        Username: doc.data().Username,
        Nome_Completo: doc.data().Nome_Completo,
        IMG_Profile: doc.data().IMG_Profile,
        N_Posts: doc.data().N_Posts,
        Bio: doc.data().Bio,
      }));

      setUserList(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      Alert.alert('Erro ao buscar usuários.');
    }
  };

  const handleUserPress = (userId: string) => {
    // Navegar para a tela de perfil do usuário, passando o id como parâmetro
    navigation.navigate('Profile', { otherUserId: userId });
    console.log('Usuário selecionado:', userId);
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item.ID)}>
      <Image
        source={item.IMG_Profile ? { uri: item.IMG_Profile } : require('../../Screens/images/profilepic.png')}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.username}>{item.Username}</Text>
        {item.Nome_Completo && <Text style={styles.fullName}>{item.Nome_Completo}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome de usuário"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={userList}
        keyExtractor={(item) => item.ID} // Usando o campo ID para chave
        renderItem={renderUserItem}
        ListEmptyComponent={() => <Text style={styles.noResults}>Nenhum usuário encontrado.</Text>}
      />
    </View>
  );
};

export default UserSearchScreen;
