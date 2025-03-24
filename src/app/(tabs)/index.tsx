import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, FlatList, View,  ActivityIndicator } from 'react-native';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Post } from '@/src/components/Post';

const samplePost = {
  user_id: "1189b0ce-1091-7043-6b12-ec6ddb26749e",
  overallScore: 88,
  imdb_id: "tt0076759",
  reviewText: "Supergoeie film, één van mijn lievelings! Zeker kijken!",
  createdAt: 1742399334230,
  scoreDetails: {
    cinematography: 92,
    story: 73,
    acting: 75
  },
  id: "80229740-beef-41f6-858f-6c53d2ee47a8",
  userName: "Jeroen",
  movie: {
    original_title: "Star Wars",
    overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    release_date: "1977-05-25",
    runtime: 121,
    tagline: "A long time ago in a galaxy far, far away..."
  }
}

const samplePost2 = {
  "user_id": "81e9000e-20b1-70f7-9065-358ae5c39f8e",
  "overallScore": 81,
  "imdb_id": "tt0266543",
  "reviewText": "This was my favorite chilhood movie, and is still amazing!",
  "createdAt": 1742483431909,
  "scoreDetails": {
    "cinematography": 79,
    "story": 92,
    "acting": 81
  },
  "id": "aef723a1-5929-4e48-9ee7-26408f8862ae",
  "userName": "Daniel Martins",
  "movie": {
    "original_title": "Finding Nemo",
    "overview": "Nemo, an adventurous young clownfish, is unexpectedly taken from his Great Barrier Reef home to a dentist's office aquarium. It's up to his worrisome father Marlin and a friendly but forgetful fish Dory to bring Nemo home -- meeting vegetarian sharks, surfer dude turtles, hypnotic jellyfish, hungry seagulls, and more along the way.",
    "poster_path": "/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
    "release_date": "2003-05-30",
    "runtime": 100,
    "tagline": "There are 3.7 trillion fish in the ocean. They're looking for one."
  }
}

const samplePosts = [samplePost, samplePost2];


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
      const text = await response.text(); // Get raw text response
      console.log("Raw API Response:", text); // Debugging
  
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
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    padding: 16,
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
