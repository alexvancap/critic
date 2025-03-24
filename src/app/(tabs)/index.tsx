import { Image, StyleSheet, Platform, FlatList, View } from 'react-native';
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
  return (
    <ThemedView style={styles.HomeContainer}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feed!</ThemedText>
      </ThemedView>

      <FlatList
        data={samplePosts}
        renderItem={({ item }) => {
          console.log("Rendering item: ", item);
          return <Post {...item} />}
        }
        
        keyExtractor={(item) => item.id}
      />
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
