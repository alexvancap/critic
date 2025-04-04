import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchMovieInput } from '../components/SearchMovieInput';
import CircleRatingInteractive from '../components/CircleRatingInteractive';

const CreatePostScreen = () => {


  const API_KEY = "1b5a60707a2d97714078e9b38dcbdbf9";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [title, setTitle] = useState('');
  // const router = useRouter();
  const [movie, setMovie] = useState({});
  const [overallScore, setOverallScore] = useState(50);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [scores, setScores] = useState({
    cinematography: 50,
    story: 50,
    acting: 50,
  });

  const postObject = {
    imdb_id: "",
    user_id: "",
    reviewText: reviewText,
    overallScore: overallScore,
    scoreDetails: scores, // Use the single state object for scores
  };


  const handleSubmit = async () => {

    try{

      const imdbId = await getImdbId(movie.id);
      const userId = "a1e930be-c0b1-7042-cf5d-801e67cf390a";

      postObject.imdb_id = imdbId;
      postObject.user_id = userId;

    } catch (error){
      console.log('Error creating post', error);
    }

    getImdbId(movie.id).then((imdbId) => {
      if (imdbId) {
        postObject.imdb_id = imdbId;
        console.log('IMDb ID:', imdbId);
      } else {
        console.log('IMDb ID not found');
      }
    });
    createPost();
  };

  const createPost = async () => {
    try {
      const response = await fetch('https://nauh6a1bvk.execute-api.eu-west-3.amazonaws.com/dev/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObject),
      });
      const data = await response.json();
      console.log('Post created', data);
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  // Single handler to update any score
  const handleScoreChange = (scoreType: string, newScore: number) => {

    if (scoreType === 'overallScore') {
      setOverallScore(newScore);
    } else {
      setScores(prevScores => ({
        ...prevScores,
        [scoreType]: newScore,
      }));
    }
  };

  const getImdbId = async (movieId) => {
    try {
      // Replace the search query with movie.id to get a specific movie
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      
      // Wait for the response and parse it as JSON
      const data = await response.json();
      
      // Check if the response contains an imdb_id
      if (data && data.imdb_id) {
        return data.imdb_id;
      } else {
        console.error('IMDb ID not found for movie:', movieId);
        return null;
      }
    } catch (error) {
      console.error('Error fetching IMDb ID:', error);
      return null;
    }
  };
  

  return (
    <ScrollView scrollEnabled={scrollEnabled} style={{ flexDirection: 'column', backgroundColor: '#1a1a1a', padding: 20, gap: 18 }}>
      <SearchMovieInput onStateChange={(newMovie: any) => setMovie(newMovie)} />
      <View style={styles.selectedMovieContainer}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, marginVertical: 20 }}>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
            style={{ width: 320, height: 480 }}
          />
          <Text style={{ color: 'white' }}>{movie.title}</Text>
        </View>
      </View>
      <View>
        {Object.keys(movie).length > 0 && (
          <View style={{ flexDirection: 'column', gap: 8 }}>
            <TextInput
              style={styles.textDescription}
              placeholder="What did you think of the movie?"
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 40 }}>
              <CircleRatingInteractive 
                rating="Overall Score" 
                score={overallScore} 
                onScoreChange={(newScore) => handleScoreChange('overallScore', newScore)} 
                onDragStart={(dragging) => setScrollEnabled(!dragging)} 
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 40 }}>
              <CircleRatingInteractive 
                rating="Cinema" 
                score={scores.cinematography} 
                onScoreChange={(newScore) => handleScoreChange('cinematography', newScore)} 
                onDragStart={(dragging) => setScrollEnabled(!dragging)} 
              />
              <CircleRatingInteractive 
                rating="Story" 
                score={scores.story} 
                onScoreChange={(newScore) => handleScoreChange('story', newScore)} 
                onDragStart={(dragging) => setScrollEnabled(!dragging)} 
              />
              <CircleRatingInteractive 
                rating="Acting" 
                score={scores.acting} 
                onScoreChange={(newScore) => handleScoreChange('acting', newScore)} 
                onDragStart={(dragging) => setScrollEnabled(!dragging)} 
              />
            </View>
            <Button title="Create Post!" onPress={handleSubmit} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDescription: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    borderRadius: 4,
    color: 'white',
  },
  selectedMovieContainer: {},
});

export default CreatePostScreen;
