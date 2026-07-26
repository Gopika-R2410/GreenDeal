import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Ionicons name="checkmark-circle" size={120} color="#22c55e" />
      
      <Text style={styles.title}>Order Confirmed!</Text>
      
      <Text style={styles.subtitle}>
        Your purchase was successful. The farmer has been notified and will prepare your delivery shortly.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.replace('/market')}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.replace('/myOrders')}
        >
          <Text style={styles.secondaryButtonText}>Track My Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#020617', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 30 
  },
  title: { 
    color: '#fff', 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginTop: 20 
  },
  subtitle: { 
    color: '#94a3b8', 
    textAlign: 'center', 
    fontSize: 16, 
    lineHeight: 24, 
    marginTop: 15,
    marginBottom: 40 
  },
  buttonContainer: {
    width: '100%',
    gap: 15
  },
  primaryButton: { 
    backgroundColor: '#22c55e', 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  secondaryButton: { 
    borderWidth: 1,
    borderColor: '#1e293b',
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  secondaryButtonText: { 
    color: '#94a3b8', 
    fontWeight: '600', 
    fontSize: 16 
  }
});