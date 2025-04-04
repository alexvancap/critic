import { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const API_KEY = "1b5a60707a2d97714078e9b38dcbdbf9"; // Replace with your TMDb API key
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  id: number;
}

export const SearchMovieInput = ({ onStateChange }) => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    if (searchText.length > 2) {
      fetchMovies(searchText);
    } else {
      setMovies([]); // Clear results if search text is too short
    }
  }, [searchText]);

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 10)); // Now displaying 5 results
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    
    onStateChange(movie);
    setSearchText('');
    setSelectedMovie({});
    setMovies([]); // Hide suggestions after selection
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        placeholderTextColor="white"
        value={searchText}
        onChangeText={setSearchText}
      />


      {movies.length > 0 && (
        <ScrollView style={styles.suggestionsContainer}>
          {movies.map((movie) => (
            <TouchableOpacity 
              key={movie.id} 
              style={styles.suggestionItem} 
              onPress={() => handleSelectMovie(movie)}
            >
              {movie.poster_path && (
                <Image 
                  source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} 
                  style={{ width: 80, height: 120 }} 
                />
              )}
              <Text style={styles.suggestionText}>{movie.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
  input: {
    height: 55,
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 3,
    color: "white",
    borderColor: "gray",
    backgroundColor: "#2C2725",
  },
  suggestionsContainer: {
    minHeight: 300, // Increased to fit 5 suggestions
    backgroundColor: "#444",
    borderRadius: 2,
    marginTop: 10,
    zIndex: 10,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  suggestionText: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 16,
    maxWidth: 210,
  },
  selectedMovieContainer: {
    flexDirection: "row",
    color: 'white',
    marginTop: 10,
  }
});

