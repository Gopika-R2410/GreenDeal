import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!name || !price || !quantity) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: name,
        price: Number(price), 
        quantity: quantity,
        userId: auth.currentUser?.uid || "Anonymous",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Product listed!");
      router.replace('/market'); 
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>List Your Crop 🌾</Text>
      
      <Text style={styles.label}>Product Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. Organic Tomatoes" 
        placeholderTextColor="#94a3b8" 
        onChangeText={setName} 
      />

      <Text style={styles.label}>Price per KG (₹)</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. 40" 
        keyboardType="numeric" 
        placeholderTextColor="#94a3b8" 
        onChangeText={setPrice} 
      />

      <Text style={styles.label}>Quantity (e.g. 50kg)</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. 100" 
        placeholderTextColor="#94a3b8" 
        onChangeText={setQuantity} 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Post to Market</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#020617', padding: 25, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { color: '#22c55e', marginBottom: 5, fontWeight: '600' },
  input: { backgroundColor: '#1e293b', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: '#22c55e', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});