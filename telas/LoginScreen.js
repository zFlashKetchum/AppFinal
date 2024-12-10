import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] =  useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
  
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'E-mail ou senha incorretos. Tente novamente!');
    }
  };
  

  return (
    <ImageBackground 
      source={require('../assets/fundo.jpg')} // Adicione a imagem de fundo
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>

        <TextInput
          style={[styles.input, emailError && styles.errorInput]}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        
        <TextInput
          style={[styles.input, passwordError && styles.errorInput]}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button title="Entrar" onPress={handleLogin} color="#007bff" />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta? </Text>
          <Button
            title="Registre-se"
            onPress={() => navigation.navigate('Register')}
            color="#FF6F61"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    fontFamily: 'Roboto',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Lato',
  },
  errorInput: {
    borderColor: '#FF6F61',
  },
  errorText: {
    color: '#FF6F61',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  registerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato',
  },
});

export default LoginScreen;
