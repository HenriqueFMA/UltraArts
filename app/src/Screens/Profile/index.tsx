import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { styles } from "./style";
import AntDesign from "@expo/vector-icons/AntDesign"; 
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserProfile } from "../../Data_Control/userServise";
import { useNetInfo } from "@react-native-community/netinfo";
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';
import { fetchUserPosts } from "../../Data_Control/PostService";
import { RootStackParamList } from '../../Data_Control/Types'; // Tipagem de navegação
import { StackNavigationProp } from '@react-navigation/stack';

// Tipagem de navegação
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface UserData {
  username: string;
  profilePicture?: string;
  followers: number;
  following: number;
  description?: string;
  fullName: string;
}

const Profile: React.FC = () => {
  const route = useRoute();
  const { otherUserId } = route.params as { otherUserId?: string };
  console.log("Outro id",otherUserId);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const netInfo = useNetInfo();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const hideMenu = () => isMenuVisible && setIsMenuVisible(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          const fetchedUserData = await getUserProfile(otherUserId || userId);
          console.log("User data:", fetchedUserData); 
          setUserData(fetchedUserData || null);
          const posts = await fetchUserPosts(otherUserId || userId);
          console.log("User posts:", posts); // Verifique se os posts estão sendo carregados
          setUserPosts(posts);
        } catch (error) {
          setError("Erro ao carregar os dados do usuário.");
        }
      } else {
        setError("Usuário não autenticado.");
      }
    };
    fetchUserData();
  }, [otherUserId]);
   // Atualize quando o otherUserId mudar

  if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>;
  }

  if (!netInfo.isConnected) {
    return <View style={styles.container}><Text>Sem conexão com a internet. Tente novamente mais tarde.</Text></View>;
  }

  // Verifica se é o próprio perfil do usuário autenticado
  const isOwnProfile = auth.currentUser?.uid === (otherUserId || auth.currentUser?.uid);

  return (
    <View>
      <ScrollView>
        <Pressable onPress={hideMenu} style={styles.container}>
          <View style={styles.cabecario}>
            <View style={styles.icons}>
              <MaterialCommunityIcons name="message" size={24} color="white" style={{ marginRight: 15 }} />
              <AntDesign name="heart" size={24} color="white" style={{ marginRight: 10 }} />
              <TouchableOpacity onPress={(e) => { e.stopPropagation(); toggleMenu(); }}>
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        
          {isMenuVisible && (
            <View style={styles.menuContainer}>
              {isOwnProfile && (
                <TouchableOpacity onPress={() => navigation.navigate('NewPost')}>
                  <Text style={styles.menuItem}>Novo post</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.menuItem}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.conteudo}>
            <View style={styles.nomeUsuario}>
              <Text style={styles.textUsuario}>{userData?.username || "Usuário"}</Text>
            </View>
            <Image
              source={userData?.profilePicture ? { uri: userData.profilePicture } : require("../images/profilepic.png")}
              style={styles.imagemPerfil}
            />
            <Text style={{ fontWeight: 'bold' }}>Descrição</Text>
            <Text>{userData?.description || "Informações não disponíveis"}</Text>
            <View style={styles.segTexto}>
              <Text style={styles.seguidoresTexto}>{userData?.followers} Seguidores</Text>
              <Text style={styles.seguidoresTexto}>{userData?.following} Seguindo</Text>
            </View>

            {/* Exibir botão de editar perfil ou seguir com base no perfil mostrado */}
            {isOwnProfile ? (
              <TouchableOpacity style={styles.botaoPerfil} onPress={() => navigation.navigate('updateProfile')}>
                <Text style={styles.textoBotao}>Editar perfil</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.botaoPerfil} onPress={() => setIsFollowing(!isFollowing)}>
                <Text style={styles.textoBotao}>{isFollowing ? 'Seguindo' : 'Seguir'}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.icons2}>
              <MaterialCommunityIcons name="grid" size={24} color="black" />
              <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
              <FontAwesome6 name="bookmark" size={24} color="black" />
            </View>
            <View style={styles.postsContainer}>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <TouchableOpacity
                    key={post.id}
                    onPress={() => navigation.navigate("PostProfile", { postId: post.id, userId: post.userId })}
                    style={styles.postsGrid}
                  >
                    <Image source={{ uri: post.content[0] }} style={styles.postImage} />
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noPostsText}>Nenhum post encontrado.</Text>
              )}
            </View>
          </View>
        </Pressable>
      </ScrollView>

      {isOwnProfile && (
        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('NewPost')}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      )}

      <BarraNavegacao />
    </View>
  );
};

export default Profile;
