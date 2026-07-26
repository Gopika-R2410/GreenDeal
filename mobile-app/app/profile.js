import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { auth, db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import * as Location from 'expo-location'; 
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Location not set');
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    try {

        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "We need location access to show your farm's area.");
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      let reverseResult = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      if (reverseResult.length > 0) {
        const addr = reverseResult[0];

        const formattedAddress = `${addr.name || addr.street}, ${addr.district || addr.city}, ${addr.postalCode}`;
        setAddress(formattedAddress);
        setLocation(userLocation.coords);

        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userRef, {
            location: formattedAddress,
            coords: { lat: userLocation.coords.latitude, lng: userLocation.coords.longitude }
          });
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch location. Ensure GPS is on.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header ... (keep your existing header) */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Location 📍</Text>
        <View style={styles.locationBox}>
          <Ionicons name="location" size={24} color="#22c55e" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.addressText} numberOfLines={2}>{address}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.locationBtn} 
            onPress={handleGetLocation}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.btnText}>Refetch</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>This helps nearby buyers find your crops faster.</Text>
      </View>

      {/* Account Info and Logout ... (keep your existing buttons) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 25 },
  section: { marginTop: 30 },
  sectionTitle: { color: '#94a3b8', fontSize: 13, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
  locationBox: { 
    backgroundColor: '#0f172a', 
    padding: 15, 
    borderRadius: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b'
  },
  addressText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  locationBtn: { backgroundColor: '#22c55e', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  hint: { color: '#64748b', fontSize: 11, marginTop: 8, fontStyle: 'italic' }
});