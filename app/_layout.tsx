import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import Home from './src/Screens//Home';
import Shop from './src/Screens//Shop';
import Profile from './src/Screens//Profile';
import NewPost from './src/Screens/NewPost';
import Login from './src/Screens/Login';
import Cadastro from './src/Screens/Cadasto';
import RecuperarSenha from './src/Screens/RecuperacaoDeSenha';
import useAuth from './src/Hooks/useAuth';
import firebase from 'firebase/app';
import React from 'react';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();// Substitua pela lógica real de autenticação

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} independent={true}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Shop" component={Shop} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
            <Stack.Screen options={{ headerShown: false }} name="NewPost" component={NewPost} />

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