// src/app/createPost.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchMovieInput } from '../components/SearchMovieInput';

const CreatePostScreen = () => {

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [movie, setMovie] = useState({});
  const router = useRouter();

  const handleSubmit = () => {
    console.log('Post created', { title, content });
    // Navigate back to Home (or another screen)
    router.push('/'); // or you can use router.back() to go back to the previous screen
  };


  return (
    <ScrollView style={{ flexDirection: 'column', backgroundColor: '#1a1a1a', padding: 20, gap: 18}}>
      <SearchMovieInput onStateChange={(newMovie: any) => setMovie(newMovie)}/>
      <View style={styles.selectedMovieContainer}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, marginVertical: 20}}>
          <Image 
            source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} 
            style={{ width: 320, height: 480 }} 
          />
          <Text style={{ color: 'white' }}>{movie.title}</Text>
        </View>
        
      </View>
      <View>
        { Object.keys(movie).length > 0 && (
          <View style={{ flexDirection: 'column', gap: 8}}>
            <TextInput
              style={styles.textDescription}
              placeholder="What did you think of the movie?"
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />
            <Button title="Create Post!" onPress={handleSubmit} />
            <View>
              
            </View>
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
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
    borderRadius: 4,
    color: 'white',
  },
  selectedMovieContainer: {
  }
});

export default CreatePostScreen;
