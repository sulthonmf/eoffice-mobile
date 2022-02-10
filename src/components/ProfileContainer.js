import React from 'react';
import {View, StyleSheet} from 'react-native';

export function ProfileContainer({children}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: '10%',
    //alignItems: 'center',
  },
});
