import { CircularProgress } from 'react-native-circular-progress';
import { View, Text, StyleSheet } from 'react-native';

interface CircleRatingProps {
  overallScore?: boolean;
  rating?: string,
  score: number;
  size?: number;
  width?: number;
  fill?: number;
  tintColor?: string;
  backgroundColor?: string;
}

const getColorForScore = (score: number) => {
  if (score >= 75) return "green"; // Good
  if (score >= 50) return "orange"; // Average
  return "red"; // Poor
};


const CircleRating = (props: CircleRatingProps) => {

  const tintColor = getColorForScore(props.score);

  return (
    <View style={[styles.container, props.overallScore && { opacity: .95 }]}>
      <CircularProgress
          size={props.size ?? 90}
          width={props.width ?? 8}
          fill={props.score}
          tintColor={tintColor}
          backgroundColor={props.overallScore ? "transparent" : "#333333"}
          >
          </CircularProgress>
          <Text style={styles.text}>{Math.round(props.score)}%</Text>
          <Text style={[styles.text, styles.description]}>{props.rating}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: '100%'
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    top: 100,
    fontSize: 12,
  }
});

export default CircleRating;