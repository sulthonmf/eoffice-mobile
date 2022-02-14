import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActivityButton from './ActivityButton';
import MaterialIcon from 'react-native-vector-icons/AntDesign';

export function Activity() {
  return (
    <View>
      <Text style={styles.titleText}>Logbook Activities</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ActivityButton
          icon="pending-actions"
          counter="2"
          status="On Pending"
        />
        <ActivityButton icon="done" counter="0" status="Done" />
        <ActivityButton icon="cancel" counter="0" status="Decline" />
      </View>
      <View style={styles.buttonWrapper}>
      <TouchableOpacity >
        <View style={styles.detailButton}>
          <Text style={{alignSelf: 'center', marginRight: 2}}>Tap to view detail</Text>
          <MaterialIcon name="arrowright" color="#484848" size={20}/>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    color: 'black',
  },
  detailButton: {
    borderWidth: 1,
    borderColor: '#484848',
    borderRadius: 10,
    width: 200,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
