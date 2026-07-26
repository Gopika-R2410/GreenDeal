import React, { useEffect, useState } from 'react';
// Added all missing UI components to prevent "ReferenceError"
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'; 
import { db, auth } from '../services/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SAFETY CHECK: If the user isn't logged in yet, wait.
    // This prevents "Cannot read property 'uid' of null" error.
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "orders"),
        where("buyerId", "==", auth.currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersList = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setOrders(ordersList);
        setLoading(false);
      }, (error) => {
        // This catches the "Insufficient Permissions" error specifically
        console.error("Firestore Error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Query Error:", err);
      setLoading(false);
    }
  }, [auth.currentUser]); // Re-run if user logs in/out

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Purchases 🛍️</Text>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.productName || "Product"}</Text>
              <Text style={styles.date}>
                {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : "Just now"}
              </Text>
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.price}>₹{item.price}</Text>
              <View style={[styles.badge, { backgroundColor: item.status === 'Shipped' ? '#065f46' : '#1e293b' }]}>
                <Text style={styles.statusText}>{item.status || "Pending"}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found. Time to go shopping!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', paddingHorizontal: 20 },
  center: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 20, marginTop: 50 },
  card: { 
    backgroundColor: '#0f172a', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b'
  },
  info: { flex: 1 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  date: { color: '#64748b', fontSize: 12, marginTop: 4 },
  rightSide: { alignItems: 'flex-end' },
  price: { color: '#22c55e', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 16 }
});