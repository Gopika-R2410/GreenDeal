import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { db, auth } from '../services/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (message.trim().length === 0) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      senderId: auth.currentUser?.uid,
      senderEmail: auth.currentUser?.email,
      createdAt: serverTimestamp(), 
    });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={[
            styles.bubble, 
            item.senderId === auth.currentUser?.uid ? styles.myMsg : styles.theirMsg
          ]}>
            <Text style={styles.senderText}>{item.senderEmail}</Text>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={90}>
        <View style={styles.inputArea}>
          <TextInput 
            value={message} 
            onChangeText={setMessage} 
            placeholder="Type a message..." 
            placeholderTextColor="#94a3b8"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' }, 
  inputArea: { flexDirection: 'row', padding: 15, backgroundColor: '#0f172a', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#1e293b', color: '#fff', borderRadius: 25, paddingHorizontal: 15, height: 45 },
  sendButton: { marginLeft: 10, backgroundColor: '#22c55e', padding: 10, borderRadius: 25 },
  bubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  myMsg: { alignSelf: 'flex-end', backgroundColor: '#22c55e' },
  theirMsg: { alignSelf: 'flex-start', backgroundColor: '#1e293b' },
  senderText: { color: '#f8fafc', fontSize: 10, opacity: 0.7, marginBottom: 2 },
  msgText: { color: '#fff' }
});