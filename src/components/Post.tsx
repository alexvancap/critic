import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, Image } from "react-native";

interface PostProps {
  user_id: string;
  overallScore: number;
  imdb_id: string;
  reviewText: string;
  createdAt: number;
  scoreDetails: {
    cinematography: number;
    story: number;
    acting: number;
  };
  id: string;
  userName: string;
  movie: {
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    tagline: string;
  }
}


export function Post({ userName, overallScore, reviewText, movie, scoreDetails }: PostProps) {

  return (
  <ThemedView style={styles.postContainer}>
    <ThemedText type="defaultSemiBold"><MaterialIcons size={28} name="account-circle" />{userName}</ThemedText>
    <ThemedText type="default">{reviewText}</ThemedText>
    <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
        style={styles.posterImage} 
      />
    <ThemedText type="subtitle">{movie.original_title}</ThemedText>
    <ThemedText type="subtitle">{movie.tagline}</ThemedText>
    <ThemedText type="defaultSemiBold">Overall Score: {overallScore}</ThemedText>
    <ThemedText type="defaultSemiBold">Cinematografy: {scoreDetails.cinematography}</ThemedText>
    <ThemedText type="defaultSemiBold">Story: {scoreDetails.story}</ThemedText>
    <ThemedText type="defaultSemiBold">Acting: {scoreDetails.acting}</ThemedText>
  </ThemedView>  
  );
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 0,
    borderRadius: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  posterImage: {
    marginTop: 10,
    width: 340,
    height: 440,
    borderRadius: 8,
  },

});