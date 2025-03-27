import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

interface CircleRatingProps {
  overallScore?: boolean;
  rating?: string;
  score: number;
  size?: number;
  width?: number;
  tintColor?: string;
  backgroundColor?: string;
  onDragStart?: (dragging: boolean) => void; // Callback to disable ScrollView
}

const getColorForScore = (score: number) => {
  if (score >= 75) return 'green';
  if (score >= 50) return 'orange';
  return 'red';
};

const CircleRating = (props: CircleRatingProps) => {
  const [score, setScore] = useState(props.score);
  const tintColor = getColorForScore(score);
  const buttonY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        props.onDragStart?.(true); // Disable ScrollView
        buttonY.setOffset(buttonY._value);
        buttonY.setValue(0);
      },
      onPanResponderMove: (event, gestureState) => {
        let newScore = Math.min(100, Math.max(0, score - gestureState.dy * 0.5));
        setScore(newScore);
        buttonY.setValue(gestureState.dy);
      },
      onPanResponderRelease: () => {
        props.onDragStart?.(false); // Enable ScrollView
        buttonY.flattenOffset();
        Animated.spring(buttonY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={[styles.container, props.overallScore && { opacity: 0.95 }]}>      
      <CircularProgress
        size={props.size ?? 90}
        width={props.width ?? 8}
        fill={score}
        tintColor={tintColor}
        backgroundColor={props.overallScore ? 'transparent' : '#333333'}
      />
      <Text style={styles.text}>{Math.round(score)}%</Text>
      <Text style={[styles.text, styles.description]}>{props.rating}</Text>
      
      <Animated.View style={[styles.dragButton, { transform: [{ translateY: buttonY }] }]} {...panResponder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 100,
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
  },
  dragButton: {
    position: 'absolute',
    bottom: -20,
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 20,
  },
});

export default CircleRating;