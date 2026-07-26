import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db, auth } from '../services/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Filter: Only show orders where the current user is the farmer
    const q = query(
      collection(db, "orders"),
      where("farmerId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      
      // Calculate Total Sales
      const total = ordersData.reduce((sum, order) => sum + Number(order.price || 0), 0);
      setTotalSales(total);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsShipped = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "Shipped" }); // Phase 4: Update status
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#22c55e" /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Total Sales</Text>
        <Text style={styles.statValue}>₹{totalSales}</Text>
      </View>

      <Text style={styles.sectionTitle}>Manage Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.buyer}>Buyer: {item.buyerEmail}</Text>
              <Text style={[styles.status, { color: item.status === 'Shipped' ? '#22c55e' : '#eab308' }]}>
                {item.status || "Pending"}
              </Text>
            </View>
            
            {item.status !== 'Shipped' && (
              <TouchableOpacity style={styles.shipBtn} onPress={() => markAsShipped(item.id)}>
                <Text style={styles.shipText}>Mark Shipped</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20, paddingTop: 60 },
  center: { flex: 1, backgroundColor: '#020617', justifyContent: 'center' },
  statCard: { backgroundColor: '#22c55e', padding: 25, borderRadius: 20, marginBottom: 30 },
  statLabel: { color: '#fff', fontSize: 16, opacity: 0.9 },
  statValue: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  orderCard: { backgroundColor: '#0f172a', padding: 15, borderRadius: 15, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  buyer: { color: '#94a3b8', fontSize: 13 },
  status: { fontSize: 12, fontWeight: 'bold', marginTop: 5 },
  shipBtn: { backgroundColor: '#1e293b', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#22c55e' },
  shipText: { color: '#22c55e', fontWeight: 'bold', fontSize: 12 }
});