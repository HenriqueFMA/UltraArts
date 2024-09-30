import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Login from './src/Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import Cadastro from './src/Screens/Cadasto';
import RecuperarSenha from './src/Screens/RecuperacaoDeSenha';
import { auth } from './src/Screens/FireBase/firebaseConfig'; 
import useAuth from './src/Hooks/useAuth';
import Home from './src/Screens/Home';
import Test from './src/Screens/Test';
import Profile from './src/Screens/Profile'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Verificar se as fontes foram carregadas antes de esconder a SplashScreen
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Carregar o estado de autenticação do usuário
  const { user } = useAuth();

  if (!loaded) {
    return null; // Retornar nulo até que as fontes sejam carregadas
  }

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} independent={true}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
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
