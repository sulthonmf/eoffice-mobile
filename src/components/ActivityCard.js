import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ActivityCard({detail, status, approved, date}) {
  return (
    <TouchableOpacity style={{paddingVertical: 10}}>
      <View style={styles.boxStyle}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.activityTitle}>{detail}</Text>
          <Text>{status} {approved}</Text>
        </View>
        <Text>{date}</Text>
      </View>
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
    fontWeight: '200'
  }
});
