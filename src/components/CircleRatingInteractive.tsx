import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

interface CircleRatingInteractiveProps {
  rating: string;
  score: number;
  onScoreChange: (newScore: number) => void; // Add this prop
  onDragStart?: (dragging: boolean) => void;
}

const CircleRatingInteractive = (props: CircleRatingInteractiveProps) => {
  const { rating, score, onScoreChange, onDragStart } = props;
  const buttonY = useRef(new Animated.Value(0)).current;

  const getColorForScore = (score: number) => {
    if (score >= 75) return 'green';
    if (score >= 50) return 'orange';
    return 'red';
  };

  const tintColor = getColorForScore(score);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        onDragStart?.(true); // Disable scrolling
        buttonY.setOffset(buttonY._value);
        buttonY.setValue(0);
      },

      onPanResponderMove: (event, gestureState) => {
        let newScore = Math.min(100, Math.max(0, score - gestureState.dy * 0.5));
        onScoreChange(newScore); // Update the score in the parent
        buttonY.setValue(gestureState.dy);
      },

      onPanResponderRelease: () => {
        onDragStart?.(false); // Enable scrolling
        buttonY.flattenOffset();
        Animated.spring(buttonY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={[styles.container]}>
      <CircularProgress
        size={90}
        width={8}
        fill={score}
        tintColor={tintColor}
        backgroundColor="#333"
      />
      <Text style={styles.text}>{Math.round(score)}%</Text>
      <Text style={[styles.text, styles.description]}>{rating}</Text>

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
    bottom: 10,
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
    borderRadius: '100%',
  },
});

export default CircleRatingInteractive;
