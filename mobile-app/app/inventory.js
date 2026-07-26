import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../services/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Inventory() {
  const [myProducts, setMyProducts] = useState([]);

  const fetchMyProducts = async () => {
    const q = query(
      collection(db, "products"), 
      where("userId", "==", auth.currentUser?.uid) 
    );
    const snapshot = await getDocs(q);
    setMyProducts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const deleteProduct = async (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "No" },
      { text: "Yes", onPress: async () => {
          await deleteDoc(doc(db, "products", id));
          fetchMyProducts();
      }}
    ]);
  };

  useEffect(() => { fetchMyProducts(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Listings 📋</Text>
      <FlatList
        data={myProducts}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteProduct(item.id)}>
              <Text style={{color: 'red'}}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  name: { color: '#fff', fontSize: 18 }
});