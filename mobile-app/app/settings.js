import React, { useState } from 'react';
import { View, Text,TextInput,
   StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from './context/ThemeContext'; 

export default function Settings() {
  const router = useRouter();
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [language, setLanguage] = useState('English');

  const languages = ['English', 'Hindi', 'Tamil', 'Spanish', 'French'];

  const changeLanguage = (lang) => {
    setLanguage(lang);
    Alert.alert("Language Updated", `App content will now be displayed in ${lang}.`);
  };
  const { dark, colors, toggleTheme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const handleVerifyMobile = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Invalid Number", "Please enter a 10-digit mobile number.");
      return;
    }
    setShowOtpInput(true);
    Alert.alert("OTP Sent", "A 6-digit code has been sent to your number (Simulated).");
  };

  const confirmOtp = () => {
    if (otp === '123456') { 
      setIsVerified(true);
      setShowOtpInput(false);
      Alert.alert("Success", "Mobile number verified successfully!");
    } else {
      Alert.alert("Error", "Incorrect OTP. Try 123456.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#020617' : '#f8fafc' }]}>
      
      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#94a3b8' : '#64748b' }]}>Appearance</Text>
        <View style={[styles.row, { backgroundColor: isDarkMode ? '#0f172a' : '#fff' }]}>
          <View style={styles.rowLabel}>
            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={22} color="#22c55e" />
            <Text style={[styles.rowText, { color: isDarkMode ? '#fff' : '#020617' }]}>Dark Mode</Text>
          </View>
          <Switch 
            value={isDarkMode} 
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#94a3b8", true: "#22c55e" }}
          />
        </View>
      </View>
      {/* 2. Mobile Verification Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Security & Verification</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.rowLabel}>
            <Ionicons name="phone-portrait-outline" size={22} color={colors.primary} />
            <Text style={[styles.rowText, { color: colors.text }]}>Mobile Backup</Text>
          </View>
          
          {!isVerified ? (
            <View style={{ marginTop: 15 }}>
              <TextInput
                placeholder="Enter 10-digit number"
                placeholderTextColor={colors.subtext}
                keyboardType="phone-pad"
                maxLength={10}
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                editable={!showOtpInput}
              />
              {!showOtpInput ? (
                <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyMobile}>
                  <Text style={styles.btnText}>Send OTP</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TextInput
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor={colors.subtext}
                    keyboardType="number-pad"
                    style={[styles.input, { color: colors.text, borderColor: colors.border, marginTop: 10 }]}
                    onChangeText={setOtp}
                  />
                  <TouchableOpacity style={styles.primaryBtn} onPress={confirmOtp}>
                    <Text style={styles.btnText}>Verify OTP</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={{ color: colors.primary, marginLeft: 8, fontWeight: 'bold' }}>{phoneNumber} Verified</Text>
            </View>
          )}
        </View>
      </View>

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#94a3b8' : '#64748b' }]}>Language</Text>
        <View style={[styles.languageGrid, { backgroundColor: isDarkMode ? '#0f172a' : '#fff' }]}>
          {languages.map((lang) => (
            <TouchableOpacity 
              key={lang} 
              style={[
                styles.langOption, 
                language === lang && styles.langSelected,
                { borderBottomColor: isDarkMode ? '#1e293b' : '#f1f5f9' }
              ]}
              onPress={() => changeLanguage(lang)}
            >
              <Text style={[
                styles.langText, 
                { color: isDarkMode ? '#fff' : '#020617' },
                language === lang && { color: '#22c55e', fontWeight: 'bold' }
              ]}>
                {lang}
              </Text>
              {language === lang && <Ionicons name="checkmark" size={20} color="#22c55e" />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#94a3b8' : '#64748b' }]}>Support</Text>
        <TouchableOpacity style={[styles.row, { backgroundColor: isDarkMode ? '#0f172a' : '#fff' }]}>
          <View style={styles.rowLabel}>
            <Ionicons name="help-circle-outline" size={22} color="#22c55e" />
            <Text style={[styles.rowText, { color: isDarkMode ? '#fff' : '#020617' }]}>Help Center</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, marginLeft: 5 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 15,
    elevation: 2
  },
  card: { padding: 15, borderRadius: 15, borderWidth: 1 },
  rowLabel: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  rowText: { fontSize: 16, fontWeight: '500' },
  input: { borderBottomWidth: 1, paddingVertical: 8, fontSize: 16, marginBottom: 10 },
  languageGrid: { borderRadius: 15, overflow: 'hidden' },
  langOption: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    borderBottomWidth: 1 
  },
  langText: { fontSize: 16 },
  langSelected: { backgroundColor: 'rgba(34, 197, 94, 0.05)' },
  primaryBtn: { backgroundColor: '#22c55e', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 10 }
});