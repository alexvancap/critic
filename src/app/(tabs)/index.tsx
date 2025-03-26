import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, FlatList, View, Text, Button,  ActivityIndicator } from 'react-native';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Post } from '@/src/components/Post';
import React from 'react';
import { useRouter } from 'expo-router';
import CreatePostButton from "@/src/components/createPostButton";
import { navigate } from 'expo-router/build/global-state/routing';

export default function HomeScreen() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://nauh6a1bvk.execute-api.eu-west-3.amazonaws.com/dev/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const text = await response.text();
  
      // Try to parse as an array
      let json;
      try {
        json = JSON.parse(text);
      } catch (error) {
        console.error("JSON Parse Error:", error);
        json = text.split("\n").filter(line => line).map(line => JSON.parse(line)); // If newline-delimited JSON
      }
  
      const postsArray = Array.isArray(json) ? json : [json]; 

      setPosts(postsArray);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };





  return (
    <ThemedView style={styles.HomeContainer}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feed!</ThemedText>
        <CreatePostButton/>
      </ThemedView>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <ThemedText type="default">{error}</ThemedText>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post {...item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 20,
  },
  stepContainer: {
    flex: 1,
    gap: 16,
  },
});
