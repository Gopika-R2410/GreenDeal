import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { loginUser } from '../services/auth';
import { useRouter } from 'expo-router';
import { useTheme } from './context/ThemeContext'; 
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const { colors } = useTheme(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(''); // FIX: This line solves your error
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      await loginUser(email, password);
      router.replace('/home'); 
    } catch (err) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background || '#020617' }]} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.logo}>🌿 GreenDeal</Text>
      <Text style={[styles.title, { color: colors.text || '#fff' }]}>Welcome Back</Text>
      
      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#94a3b8"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]} 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />

      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        <TextInput 
          secureTextEntry={!showPassword} 
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          style={{ flex: 1, color: colors.text }}
          onChangeText={(val) => {
            setPassword(val);
            if (val.length > 0 && val.length < 6) setPassError("Minimum 6 characters required");
            else setPassError("");
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {passError ? <Text style={styles.errorText}>{passError}</Text> : null}
      
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center' },
  logo: { color: '#22c55e', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#0f172a', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f172a', paddingHorizontal: 15, borderRadius: 10, borderWidth: 1, height: 55, marginBottom: 5 },
  button: { padding: 18, borderRadius: 10, marginTop: 15 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#94a3b8', textAlign: 'center', marginTop: 20 },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 }
});