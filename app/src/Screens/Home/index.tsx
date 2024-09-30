import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Image} from "react-native";
import { styles } from './styles';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import Post from '../../components/Post';



const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
const handleLogout = async ()=>{
    await signOut(auth);
}
const postId = '12345';
    return (
       <View style={styles.main} >
            <TouchableOpacity style={styles.ButtonEntrar} onPress={handleLogout}>
                <Text>sair</Text>
            </TouchableOpacity>
            <Post navigation={navigation} postId={postId} />
       </View>
    );
}
export default Home;

