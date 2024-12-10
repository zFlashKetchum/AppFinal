import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
  
    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao registrar, tente novamente!');
    }
  };
  

  return (
    <ImageBackground 
      source={require('../assets/fundo.jpg')} 
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Criar Conta</Text>

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

        <TextInput
          style={[styles.input, confirmPasswordError && styles.errorInput]}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#aaa"
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button title="Registrar" onPress={handleRegister} color="#007bff" />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}></Text>
          <Button 
            title="Entrar" 
            onPress={() => navigation.navigate('Login')} 
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
    marginBottom: 15,
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
  loginContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato',
  },
});

export default RegisterScreen;
