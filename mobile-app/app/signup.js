import React,{ useState } from 'react';
import { View, Text, TextInput ,Platform, ScrollView, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native';
// import { registerUser } from '../services/auth';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUser } from '../services/auth';
import { useRouter } from 'expo-router';
import { useTheme } from './context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');
  const router = useRouter();
  const { colors } = useTheme();
const [showPassword, setShowPassword] = useState(false);
const [isFocused, setIsFocused] = useState(false);

  const handleSignup = async () => {
    const { fullName, email, phone, password } = formData;
    
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password too short");
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email: email.toLowerCase(),
        phone,
        createdAt: new Date()
      });

      Alert.alert("Success", "Account Created!");
      router.replace('/home'); 
    } catch (err) {
      Alert.alert("Signup Failed", err.message);
    }
  };
 return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background || '#020617' }]} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <Text style={styles.logo}>🌿 GreenDeal</Text>
        <Text style={[styles.title, { color: colors.text || '#fff' }]}>Create Account</Text>
        
        <TextInput 
          placeholder="Full Name" 
          placeholderTextColor="#94a3b8"
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]} 
          onChangeText={(val) => setFormData({...formData, fullName: val})} 
        />

        <TextInput 
          placeholder="Email" 
          placeholderTextColor="#94a3b8"
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]} 
          onChangeText={(val) => setFormData({...formData, email: val})} 
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput 
          placeholder="Mobile Number" 
          placeholderTextColor="#94a3b8"
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]} 
          onChangeText={(val) => setFormData({...formData, phone: val})} 
          keyboardType="phone-pad"
        />

        <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <TextInput 
            secureTextEntry={!showPassword} 
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            style={{ flex: 1, color: colors.text }}
            onChangeText={(val) => {
              setFormData({...formData, password: val});
              setPassError(val.length < 6 ? "Minimum 6 characters required" : "");
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        {passError ? <Text style={styles.errorText}>{passError}</Text> : null}
        
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  logo: { color: '#22c55e', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 10, borderWidth: 1, height: 55, marginBottom: 5 },
  button: { padding: 18, borderRadius: 10, marginTop: 15 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#94a3b8', textAlign: 'center', marginTop: 20 },
  errorText: { color: '#ef4444', fontSize: 12, marginBottom: 10 }
});