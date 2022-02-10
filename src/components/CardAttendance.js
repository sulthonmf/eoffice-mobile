import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export function CardAttendance() {
  return (
    <View style={{marginVertical: 15}}>
      <View style={styles.Wrapper}>
        <View style={styles.timeWrapper}>
          <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>Check In Time</Text>
          <Text style={{fontSize: 24, color: 'black',}}>08.10</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>Check Out Time</Text>
          <Text style={{fontSize: 24, color: 'black',}}>17.10</Text>
        </View>
      </View>
      <TouchableOpacity style={{justifyContent: 'center', backgroundColor: '#3A66FF', height: 40, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
        <Text style={{fontSize: 16, alignSelf: 'center', fontWeight: '400', color: 'white'}}>TAKE ATTENDANCE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    height: 80,
    borderWidth: 2,
    borderColor: '#3A66FF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeWrapper: {alignItems:'center', marginHorizontal: '12%'}
});
