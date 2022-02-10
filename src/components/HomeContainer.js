import React from 'react';
import {View, StyleSheet} from 'react-native';

export function HomeContainer({children}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: '5%',
    backgroundColor: 'white',
    //alignItems: 'center',
  },
});
