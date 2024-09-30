import React from 'react';
import { View } from 'react-native';
import PostComponent from '../../components/Post';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const PostScreen = () => {
  const Id = 'v6C5IPILjeZrTmc7qpCg';

  return (
    <View style={{ flex: 1 }}>
      <PostComponent postId={Id} />
    </View>
  );
};

export default PostScreen;
