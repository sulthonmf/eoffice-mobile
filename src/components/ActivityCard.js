import {Animated, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect} from 'react';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default function ActivityCard({subject, status, approved, date, onPress, color,}) {
  return (
    <TouchableOpacity style={{paddingVertical: 10}} onPress={onPress}>
      <FadeInView style={styles.boxStyle}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.activityTitle}>{subject}</Text>
          <Text>{status}</Text>
          <Text style={{color:color}}>{approved}</Text>
        </View>
        <Text>{date}</Text>
      </FadeInView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    backgroundColor: '#eceff1',
    borderRadius: 2.5,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between'
  },
  activityTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600'
  }
});
