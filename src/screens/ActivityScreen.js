import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Activity } from '../components/Activity';
import ActivityCard from '../components/ActivityCard';
import {CardAttendance} from '../components/CardAttendance';
import {HomeContainer} from '../components/HomeContainer';

export function ActivityScreen({navigation}) {
  return (
    <HomeContainer>
      <View>
      <View style={{flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
        <Text style={styles.activityTitle}>My Activity</Text>
        <TouchableOpacity>
            <Text style={{color: 'blue'}}>Add New</Text>
        </TouchableOpacity>
      </View>
        <Text style={styles.recentTitle}>Recent</Text>
      </View>
      <ScrollView>
          <ActivityCard detail='Reset password user 170021' date='6 Feb' status='Pending' approved='Un-Review'/>
          <ActivityCard detail='Maintain Server 198' date='8 Feb' status='Done' approved='Approved'/>
      </ScrollView>
    </HomeContainer>
  );
}

const styles = StyleSheet.create({
  activityTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 12
  }
});
