import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebase'; 
import { signOut } from 'firebase/auth'; 

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace('/login');
          } catch (err) {
            Alert.alert("Error", err.message);
          }
        } 
      }
    ]);
  };

  const menuItems = [
    { title: "➕ Add Product", desc: "List your crops", path: "/addProduct", icon: "leaf" },
    { title: "🛒 View Market", desc: "Browse products", path: "/market", icon: "cart" },
    { title: "📊 Dashboard", desc: "Check sales", path: "/dashboard", icon: "stats-chart" },
    { title: "💬 Chat", desc: "Talk to others", path: "/chat", icon: "chatbubbles" },
    { title: "👤 My Profile", desc: "Manage account", path: "/profile", icon: "person" }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌿 GreenDeal</Text>
        <Text style={styles.subtitle}>Direct Farm to Market</Text>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => router.push(item.path)}>
            <Ionicons name={item.icon} size={32} color="#22c55e" style={styles.icon} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout button IS NOW OUTSIDE the grid loop */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#020617', padding: 20, paddingTop: 60 },
  header: { marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 40, color: '#22c55e', fontWeight: 'bold' },
  subtitle: { color: '#94a3b8', fontSize: 16 },
  grid: { gap: 20 },
  card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#1e293b' },
  icon: { marginBottom: 10 },
  cardTitle: { color: '#f8fafc', fontSize: 22, fontWeight: 'bold' },
  cardDesc: { color: '#94a3b8', fontSize: 14, marginTop: 5 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40, padding: 15 },
  logoutText: { color: '#ef4444', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }
});