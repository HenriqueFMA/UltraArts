import React from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Image} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import PostComponent from '../../components/Post';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import BarraNavegacao from '../../components/BarraDeNavegacao/Index';


const PostScreen = () => {
  const handleLogout = async ()=>{
    await signOut(auth);
}

  return (
    <View style={{ flex: 1 }}>
      <PostComponent Id="v6C5IPILjeZrTmc7qpCg" />
      <TouchableOpacity onPress={handleLogout}>
                <Text>sair</Text>
            </TouchableOpacity>
      <BarraNavegacao/>

    </View>
  );
};

export default PostScreen;
