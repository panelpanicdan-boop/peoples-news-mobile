// File: App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import SinglePostScreen from './screens/SinglePostScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SinglePost" component={SinglePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// File: screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const mockPosts = [
  { id: '1', title: 'Breaking News', image: 'https://picsum.photos/300', user: 'User1' },
  { id: '2', title: 'Local Event', image: 'https://picsum.photos/301', user: 'User2' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">People's News</Text>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SinglePost', { post: item })}>
            <View className="mb-6 bg-gray-100 p-3 rounded-2xl">
              <Image source={{ uri: item.image }} className="w-full h-48 rounded-xl mb-2" />
              <Text className="text-xl font-semibold">{item.title}</Text>
              <Text className="text-gray-500">By {item.user}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// File: screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Create Post</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        className="border p-2 mb-3 rounded"
      />
      <Button title="Choose Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} className="w-full h-48 mt-3 rounded-xl" />}    
      <Button title="Publish" onPress={() => {}} className="mt-4" />
    </View>
  );
}

// File: screens/ProfileScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold">User Profile</Text>
    </View>
  );
}

// File: screens/SinglePostScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';

export default function SinglePostScreen({ route }) {
  const { post } = route.params;
  return (
    <View className="p-4 bg-white flex-1">
      <Image source={{ uri: post.image }} className="w-full h-60 rounded-xl mb-3" />
      <Text className="text-3xl font-bold mb-2">{post.title}</Text>
      <Text className="text-gray-500 mb-4">By {post.user}</Text>
    </View>
  );
}

// File: babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
