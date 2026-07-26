import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router'; 
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, TouchableOpacity } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext'; 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); 

  return (
    <CustomThemeProvider>
      {/* 2. Standard Navigation Theme Provider */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack 
          screenOptions={{ 
            headerShown: true, 
            headerStyle: { backgroundColor: '#020617' }, 
            headerTintColor: '#fff',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push('/settings')}>
                <Ionicons name="settings-outline" size={24} color="#22c55e" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          }}
        >
          {/* Screens WITHOUT the Settings Header */}
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} /> 
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />

          {/* Main App Screens WITH the Settings Header */}
          <Stack.Screen name="home" options={{ title: 'GreenDeal' }} />
          <Stack.Screen name="market" options={{ title: 'Marketplace' }} />
          <Stack.Screen name="addProduct" options={{ title: 'List Crop' }} />
          <Stack.Screen name="chat" options={{ title: 'Messages' }} />
          <Stack.Screen name="dashboard" options={{ title: 'Farmer Dashboard' }} />
          <Stack.Screen name="orderSuccess" options={{ title: 'Success', headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: true }}/>
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </CustomThemeProvider>
  );
}
