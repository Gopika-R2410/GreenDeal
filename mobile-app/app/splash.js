import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import React from 'react';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌿 GreenDeal</Text>
      <Text style={styles.tag}>Direct Farm to Home</Text>
      <ActivityIndicator size="small" color="#00ffcc" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f2027', justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 48, color: '#00ffcc', fontWeight: 'bold' },
  tag: { color: '#aaa', marginTop: 10, letterSpacing: 2 },
});