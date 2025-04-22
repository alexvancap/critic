import { StyleSheet, Button } from 'react-native';
import { ThemedText } from "@/src/components/ThemedText"
import { ThemedView } from '@/src/components/ThemedView';

import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '@/src/state/userSlice';

export default function ProfileScreen() {

  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);

  // still fix unkown problem.

  return (

  <ThemedView style={styles.titleContainer}>
    <ThemedText type="title">Profile</ThemedText>
    <ThemedText type="default">Status: {status}</ThemedText>
    <Button title='Set status' onPress={() => dispatch(setStatus('online'))} color='#0a7ea4' />
  </ThemedView>  
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#000000',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 40,
    padding: 20,
  },
});