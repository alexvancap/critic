import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, Image, View } from "react-native";

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
    <View style={styles.userContainer}>
      <MaterialIcons size={38} color={'#fff'} name="account-circle" />
      <ThemedText type="defaultSemiBold">{userName}</ThemedText>
    </View>
    <ThemedText type="defaultSemiBold">{reviewText}</ThemedText>
    <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
        style={styles.posterImage} 
      />
    <ThemedText type="subtitle">{movie.original_title}</ThemedText>
    <ThemedText type="default">{movie.tagline}</ThemedText>
    <ThemedText type="default">Overall Score {overallScore}</ThemedText>
    <ThemedText type="defaultSemiBold">Cinematografy {scoreDetails.cinematography}</ThemedText>
    <ThemedText type="defaultSemiBold">Story {scoreDetails.story}</ThemedText>
    <ThemedText type="defaultSemiBold">Acting {scoreDetails.acting}</ThemedText>
    <View style={styles.line} />
  </ThemedView>  
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingBottom: 10,
    marginBottom: 16,
  },
  posterImage: {
    marginVertical: 12,
    width: 340,
    height: 440,
    borderRadius: 4,
  },
  userContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
    lineHeight: 10,
    alignItems: 'center',
    color: 'white'
  },
  line: {
    width: '100%', 
    height: 1, 
    backgroundColor: 'gray', 
    marginVertical: 10, // Optional spacin
  }

});