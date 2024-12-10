import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firestore } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddItemScreen = () => {
  const [nomeItem, setNomeItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const item = route.params?.item;

  useEffect(() => {
    if (item) {
      setNomeItem(item.nomeItem);
      setQuantidade(item.quantidade);
    }
  }, [item]);

  const saveItem = async () => {
    if (!nomeItem || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const itemRef = item
      ? doc(firestore, 'compras', item.id)
      : doc(firestore, 'compras', new Date().getTime().toString());

    await setDoc(itemRef, {
      nomeItem,
      quantidade,
      comprado: false,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item ? 'Editar Item' : 'Adicionar Item'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Item"
        value={nomeItem}
        onChangeText={setNomeItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <Button title={item ? "Salvar Alterações" : "Adicionar Item"} onPress={saveItem} />

      {/* Botão de Voltar */}
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        color="#007bff"
        style={styles.backButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,  // Posicionando o botão mais para baixo
    left: 20,
    backgroundColor: '#ff4f5a',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
});

export default AddItemScreen;
