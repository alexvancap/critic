// src/app/createPost.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchMovieInput } from '../components/SearchMovieInput';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Handle the post creation logic here (e.g., API call)
    console.log('Post created', { title, content });

    // Navigate back to Home (or another screen)
    router.push('/'); // or you can use router.back() to go back to the previous screen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#1a1a1a', alignItems: 'center', padding: 20}}>
      <SearchMovieInput/>
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
      <Button title="Submit Post" onPress={handleSubmit} />
    </View>
  );
};

export default CreatePostScreen;
