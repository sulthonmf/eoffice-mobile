import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return <View style={[styles.container, {backgroundColor: 'white'}]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
