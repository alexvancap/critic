import { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const SearchMovieInput = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const movies = [
    { imdb_id: "tt203030", original_title: "Avatar: The Way of Water" },
    { imdb_id: "tt0111161", original_title: "The Shawshank Redemption" },
    { imdb_id: "tt0120815", original_title: "The Lord of the Rings: The Return of the King" },
    { imdb_id: "tt0068646", original_title: "The Godfather" },
    { imdb_id: "tt0071562", original_title: "The Godfather: Part II" },
    { imdb_id: "tt0468569", original_title: "The Dark Knight" },
    { imdb_id: "tt0083658", original_title: "The Godfather: Part III" },
    { imdb_id: "tt0108052", original_title: "The Lord of the Rings: The Fellowship of the Ring" },
    { imdb_id: "tt0120737", original_title: "Pulp Fiction" },
    { imdb_id: "tt0133093", original_title: "The Matrix" },
    { imdb_id: "tt0167260", original_title: "Inception" },
    { imdb_id: "tt0073486", original_title: "Schindler's List" },
  ];

  const handleTextChange = (text) => {
    setSearchText(text);

    // Filter and limit to 3 movies
    if (text.length > 0) {
      const filtered = movies
        .filter((movie) => movie.original_title.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 3);
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  };

  const handleSelectMovie = (movieTitle) => {
    setSearchText(movieTitle);
    setFilteredMovies([]); // Hide suggestions after selection
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        placeholderTextColor="white"
        value={searchText}
        onChangeText={handleTextChange}
      />
      
      {/* Display movie suggestions */}
      {filteredMovies.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {filteredMovies.map((movie) => (
            <TouchableOpacity key={movie.imdb_id} style={styles.suggestionItem} onPress={() => handleSelectMovie(movie.original_title)}>
              <Text style={styles.suggestionText}>{movie.original_title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: "white",
    borderColor: "gray",
    backgroundColor: "#2C2725",
  },
  suggestionsContainer: {
    backgroundColor: "#444",
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  suggestionText: {
    color: "white",
  },
});

