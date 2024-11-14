import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import Home from './src/Screens/Home';
import Shop from './src/Screens/Shop';
import Profile from './src/Screens/Profile';
import NewPost from './src/Screens/NewPost';
import Login from './src/Screens/Login';
import Cadastro from './src/Screens/Cadastro';
import RecuperarSenha from './src/Screens/RecuperacaoDeSenha';
import updateProfile from './src/Screens/UpdateProfile';
import useAuth from './src/Hooks/useAuth';

const Stack = createStackNavigator();

// Prevenir que a splash screen esconda antes de carregar os assets
SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const { user } = useAuth(); // Substitua pela lógica real de autenticação

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} independent={true}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Shop" component={Shop} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
            <Stack.Screen options={{ headerShown: false }} name="NewPost" component={NewPost} />
            <Stack.Screen options={{ headerShown: false }} name="updateProfile" component={updateProfile} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro} />
            <Stack.Screen options={{ headerShown: false }} name="RecuperarSenha" component={RecuperarSenha} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
