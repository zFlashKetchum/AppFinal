import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';  // Corrigido para usar a exportação correta
import LoginScreen from './telas/LoginScreen';  // Tela de Login
import RegisterScreen from './telas/RegisterScreen';  // Tela de Registro
import HomeScreen from './telas/HomeScreen';  // Tela Home para a lista de compras
import AddItemScreen from './telas/AddItemScreen';  // Tela de adicionar/editar item

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Estado de login
  const [loading, setLoading] = useState(true);  // Estado de carregamento

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {  // Certifique-se de passar o 'auth' correto
      console.log('Status de autenticação alterado:', user); // Log para depuração
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);  // Após a verificação do status de login, remove o indicador de carregamento
    });

    return unsubscribe;  // Limpeza do listener
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }} // Remover a barra de navegação na Home
            />
            <Stack.Screen 
              name="AddItem" 
              component={AddItemScreen} 
              options={{ headerShown: false }} // Remover a barra de navegação na AddItem
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} // Remover a barra de navegação na Login
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ headerShown: false }} // Remover a barra de navegação na Register
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
