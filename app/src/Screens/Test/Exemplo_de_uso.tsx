import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getUserData } from '../FireBase/userService'; // ajuste o caminho conforme necessário

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Perfil do Usuário</Text>
          <Text>Nome: {userData.name}</Text>
          <Text>Data de Nascimento: {userData.dateOfBirth}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>UID: {userData.uid}</Text>
          {userData.profilePicture && (
            <Image 
              source={{ uri: userData.profilePicture }} 
              style={styles.profilePicture} 
            />
          )}
        </>
      ) : (
        <Text>Carregando dados do usuário...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

export default ProfileScreen;
