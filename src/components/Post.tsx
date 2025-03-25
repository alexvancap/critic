import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, Image, View, Text } from "react-native";
import CircleRating from "./CircleRating";

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

function timeAgo(timestamp: number) {
  const now = Date.now(); // Current time in milliseconds
  const diff = now - timestamp; // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}

export function Post({ userName, overallScore, reviewText, movie, scoreDetails, createdAt }: PostProps) {

  return (
  <ThemedView style={styles.postContainer}>
    <View style={styles.userContainer}>
      <MaterialIcons size={38} color={'#fff'} name="account-circle" />
      <ThemedText type="defaultSemiBold">{userName}</ThemedText>
      <ThemedText type="default" style={{ position: "absolute", right: 0, color: "gray", fontSize: 14 }}>{timeAgo(createdAt)}</ThemedText>
    </View>
    <View style={{ position: "relative", alignItems: "center", justifyContent: "center"}}>
    <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
        style={styles.posterImage} 
      />
    <View style={{ position: 'absolute', right: 14, bottom: 30 }}>
      <CircleRating overallScore={true} width={10} size={75} score={scoreDetails.cinematography}/>
    </View>
    </View>
    <ThemedText type="subtitle">{movie.original_title}</ThemedText>
    <ThemedText type="defaultSemiBold">{reviewText}</ThemedText>
    <ThemedView style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginVertical: 12 }}>
      <CircleRating rating='Cinema' score={scoreDetails.cinematography}/>
      <CircleRating rating='Story' score={scoreDetails.story}/>
      <CircleRating rating='Acting' score={scoreDetails.acting}/>
    </ThemedView>
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
    marginVertical: 14,
    width: 352,
    height: 465,
    borderRadius: 0,
  },
  userContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
    alignItems: 'center',
    color: 'white'
  },
  line: {
    width: '100%', 
    height: .5, 
    backgroundColor: 'gray', 
    marginTop: 25,
  }

});