import { Image, StyleSheet, Platform, FlatList } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
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

const samplePosts = [samplePost];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.HomeContainer}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feed!</ThemedText>
      </ThemedView>

      <FlatList
        data={samplePosts}
        renderItem={({ item }) => <Post {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.stepContainer}
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
