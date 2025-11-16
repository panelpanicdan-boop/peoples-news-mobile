// App.js — Expo managed demo for People's News mobile (mock)
import React, { useEffect, useState } from "react";
import { Button, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([
    { id: "1", user: "Alex", text: "Town fair", uri: null },
  ]);
  const [username, setUsername] = useState("DemoUser");
  const [editing, setEditing] = useState("");

  useEffect(() => {
    (async () => {
      const camStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(camStatus.status === "granted");
      // image picker for gallery
      if (Platform.OS !== "web") {
        const libStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libStatus.status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.7,
    });
    if (!result.cancelled) setImage(result.uri);
  }

  async function pickFromCamera() {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });
    if (!result.cancelled) setImage(result.uri);
  }

  function postImage() {
    const id = Math.random().toString(36).slice(2,9);
    setPosts([{ id, user: username, text: editing || "(no text)", uri: image }, ...posts]);
    setImage(null); setEditing("");
    alert("Posted (mock)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <Text style={styles.title}>People's News (Mobile Mock)</Text>

        <View style={styles.box}>
          <Text style={{ fontWeight: '700' }}>Create post</Text>
          <TextInput placeholder="What's happening?" value={editing} onChangeText={setEditing} style={styles.input} />
          <Button title="Pick from gallery" onPress={pickImage} />
          <View style={{ height: 8 }} />
          <Button title="Open camera" onPress={pickFromCamera} />
          {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginTop: 8 }} />}
          <View style={{ height: 8 }} />
          <Button title="Post (mock)" onPress={postImage} />
        </View>

        <View style={{ height: 12 }} />

        <View>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Feed</Text>
          {posts.map(p => (
            <View key={p.id} style={styles.card}>
              <Text style={{ fontWeight: 700 }}>{p.user}</Text>
              <Text style={{ color: '#666' }}>{p.text}</Text>
              {p.uri ? <Image source={{ uri: p.uri }} style={{ width: '100%', height: 180, marginTop: 8 }} /> : null}
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
        <Text style={{ color: '#666' }}>This is a demo. To publish, wire backend auth, storage, and payments.</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  box: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#eee", padding: 8, borderRadius: 6, marginTop: 8, marginBottom: 8 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: "#eee" }
});
