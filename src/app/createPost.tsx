// src/app/createPost.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchMovieInput } from '../components/SearchMovieInput';

const CreatePostScreen = () => {

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [movie, setMovie] = useState({});
  const router = useRouter();

  const handleSubmit = () => {
    // Handle the post creation logic here (e.g., API call)
    console.log('Post created', { title, content });

    // Navigate back to Home (or another screen)
    router.push('/'); // or you can use router.back() to go back to the previous screen
  };

  const handleSelectMovie = (newMovie) => {
    setMovie(newMovie);
  }



  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a', padding: 20}}>
      <SearchMovieInput onStateChange={handleSelectMovie}/>
      <View style={styles.selectedMovieContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10}}>
          <Image 
            source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} 
            style={{ width: 200, height: 300 }} 
          />
          <View style={{ flexDirection: 'column'}}>
            <Text style={{  color: 'white'}}>{movie.release_date}</Text>
            <Text style={{  color: 'white'}}>{movie.release_date}</Text>
            <Text style={{  color: 'white'}}>{movie.release_date}</Text>
          </View>
        </View>
        <Text style={{ color: 'white' }}>{movie.title}</Text>
      </View>
      <TextInput
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          width: '100%',
          paddingLeft: 10,
          borderRadius: 4,
          color: 'white',
        }}
        placeholder="What did you think of the movie?"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Create Post!" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMovieContainer: {
  }
});

export default CreatePostScreen;
