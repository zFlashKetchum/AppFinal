import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch, Button, Alert } from 'react-native';
import { firestore } from '../Firebase';
import { collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  // Função para carregar os itens da Firestore em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'compras'), (querySnapshot) => {
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Ordenar os itens para que os não riscados fiquem no topo
      itemsList.sort((a, b) => a.comprado - b.comprado);  // Itens não riscados (comprado: false) primeiro
      setItems(itemsList);
    });

    // Retornar a função de limpeza para parar de escutar as atualizações quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Função para atualizar o status de "comprado"
  const toggleBought = async (id, currentStatus) => {
    const itemRef = doc(firestore, 'compras', id);
    await updateDoc(itemRef, {
      comprado: !currentStatus
    });
  };

  // Função para excluir um item
  const deleteItem = async (id) => {
    Alert.alert(
      "Excluir item",
      "Você tem certeza que deseja excluir este item?",
      [
        { text: "Cancelar" },
        { text: "Excluir", onPress: async () => {
            const itemRef = doc(firestore, 'compras', id);
            await deleteDoc(itemRef);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>

      {/* Removi o ScrollView e mantive apenas o FlatList */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, item.comprado && styles.itemBought]}>
              {item.nomeItem} - {item.quantidade}
            </Text>
            
            <View style={styles.actions}>
              <Switch
                value={item.comprado}
                onValueChange={() => toggleBought(item.id, item.comprado)}
              />
              <TouchableOpacity onPress={() => navigation.navigate('AddItem', { item })}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
      <Button title="Adicionar Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  itemBought: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 15,
    color: '#007bff',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 15,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
