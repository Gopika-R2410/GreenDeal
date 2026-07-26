import { useEffect, useState } from 'react';
import { auth,db } from '../services/firebase'; // Check path consistency
import { useRouter } from 'expo-router';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Market() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const suggestPrice = (price) => {
    const p = Number(price);
    if (p < 50) return p + 10;
    if (p < 100) return p + 20;
    return p + 30;
  };

  
const handlePayment = async (item) => {
  if (!auth.currentUser) {
    Alert.alert("Error", "You must be logged in to buy products.");
    return;
  }

  const upiUrl = `upi://pay?pa=9894859889@upi&pn=GreenDeal&am=${item.price}&cu=INR`;

  Alert.alert(
    "Confirm Purchase",
    `Pay ₹${item.price} for ${item.name}?`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Pay & Order",
        onPress: async () => {
          try {
            await Linking.openURL(upiUrl);
           
            await addDoc(collection(db, "orders"), {
              productId: item.id,
              productName: item.name,
              price: item.price,
              buyerId: auth.currentUser.uid,
              buyerEmail: auth.currentUser.email,
              farmerId: item.userId || "Unknown", // The person who listed it
              status: "Pending", // Pending, Shipped, Delivered
              createdAt: serverTimestamp(),
            });

            router.push('/orderSuccess');
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Could not complete the order. Please try again.");
          }
        },
      },
    ]
  );
};
  
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <LinearGradient
      colors={darkMode ? ['#0f2027', '#203a43', '#2c5364'] : ['#f1f5f9', '#cbd5e1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#0f172a' }]}>🌿 Market</Text>
        <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
          <Text style={{ color: darkMode ? '#22c55e' : '#1e293b' }}>{darkMode ? "🌙 Dark" : "☀️ Light"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlurView intensity={darkMode ? 40 : 80} tint={darkMode ? "dark" : "light"} style={styles.card}>
            <Text style={[styles.product, { color: darkMode ? '#fff' : '#0f172a' }]}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={styles.aiPrice}>AI Suggested: ₹{suggestPrice(item.price)}</Text>

            <TouchableOpacity
              onPressIn={() => (scale.value = withSpring(0.95))}
              onPressOut={() => (scale.value = withSpring(1))}
              onPress={() => handlePayment(item)}
            >
              <Animated.View style={[styles.button, animatedStyle]}>
                <Text style={styles.buttonText}>Buy Now</Text>
              </Animated.View>
            </TouchableOpacity>
          </BlurView>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  card: { padding: 20, borderRadius: 20, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  product: { fontSize: 20, fontWeight: '600' },
  price: { fontSize: 18, color: '#22c55e', marginVertical: 5 },
  aiPrice: { fontSize: 14, color: '#eab308', marginBottom: 10 },
  button: { backgroundColor: '#22c55e', padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});