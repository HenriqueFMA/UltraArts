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
import { getUserProfile, getFollowersCount, getFollowingCount } from "../../Data_Control/userServise";
import { useNetInfo } from "@react-native-community/netinfo";
import BarraNavegacao from "../../components/BarraDeNavegacao/Index";
import { fetchUserPosts } from "../../Data_Control/PostService";
import { RootStackParamList } from "../../Data_Control/Types";
import { StackNavigationProp } from "@react-navigation/stack";
import { toggleFollow, checkIfUserIsFollowing } from "../../Data_Control/Follow";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

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
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const netInfo = useNetInfo();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate("Login");
  };

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const hideMenu = () => isMenuVisible && setIsMenuVisible(false);

  const handleFollowToggle = async () => {
    try {
      await toggleFollow(otherUserId!);  // Alterna o status de seguir/deseguir
      setIsFollowing(!isFollowing);

      const updatedFollowersCount = await getFollowersCount(otherUserId || auth.currentUser?.uid!);
      setFollowersCount(updatedFollowersCount);
    } catch (error) {
      setError("Erro ao seguir/deseguir.");
      console.error("Erro ao seguir/deseguir:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          setError("Usuário não autenticado.");
          return;
        }

        const fetchedUserData = await getUserProfile(otherUserId || userId);
        setUserData(fetchedUserData || null);

        const posts = await fetchUserPosts(otherUserId || userId);
        setUserPosts(posts);

        const followerCount = await getFollowersCount(otherUserId || userId);
        setFollowersCount(followerCount);

        const followingCount = await getFollowingCount(otherUserId || userId);
        setFollowingCount(followingCount);

        const isUserFollowingResult = await checkIfUserIsFollowing(auth.currentUser?.uid!, otherUserId || userId);
        setIsFollowing(isUserFollowingResult);
      } catch (error) {
        setError("Erro ao carregar os dados do usuário.");
        console.error(error);
      }
    };

    fetchUserData();
  }, [otherUserId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!netInfo.isConnected) {
    return (
      <View style={styles.container}>
        <Text>Sem conexão com a internet. Tente novamente mais tarde.</Text>
      </View>
    );
  }

  const isOwnProfile = auth.currentUser?.uid === (otherUserId || auth.currentUser?.uid);

  return (
    <View>
      <ScrollView style={styles.scrollContainer}>
        <Pressable onPress={hideMenu} style={styles.container}>
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
            </View>
          </View>

          {isMenuVisible && (
            <View style={styles.menuContainer}>
              {isOwnProfile && (
                <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
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
              source={
                userData?.profilePicture
                  ? { uri: userData.profilePicture }
                  : require("../images/profilepic.png")
              }
              style={styles.imagemPerfil}
            />
            <Text style={{ fontWeight: "bold" }}>Descrição</Text>
            <Text>{userData?.description || "Informações não disponíveis"}</Text>
            <View style={styles.segTexto}>
              <Text style={styles.seguidoresTexto}>{followersCount} Seguidores</Text>
              <Text style={styles.seguidoresTexto}>{followingCount} Seguindo</Text>
            </View>

            {!isOwnProfile ? (
              <TouchableOpacity
                style={[styles.botaoPerfil, isFollowing ? styles.botaoSeguindo : styles.botaoSeguir]}
                onPress={handleFollowToggle} // Alterna o estado de seguir/deseguir
              >
                <Text style={styles.textoBotao}>
                  {isFollowing ? "Seguindo" : "Seguir"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.botaoPerfil}
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <Text style={styles.textoBotao}>Editar perfil</Text>
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
                    onPress={() =>
                      navigation.navigate("PostProfile", {
                        postId: post.id,
                        userId: post.userId,
                      })
                    }
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
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate("NewPost")}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      )}
      <BarraNavegacao />
    </View>
  );
};

export default Profile;
