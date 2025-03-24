import { StyleSheet } from 'react-native';

import { ThemedText } from "@/src/components/ThemedText"
import { ThemedView } from '@/src/components/ThemedView';

export default function ProfileScreen() {
  return (

  <ThemedView style={styles.titleContainer}>
    <ThemedText type="title">Profile</ThemedText>
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