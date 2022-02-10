import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Activity } from '../components/Activity';
import {CardAttendance} from '../components/CardAttendance';
import {HomeContainer} from '../components/HomeContainer';

export function HomeScreen({navigation}) {
  return (
    <HomeContainer>
      <View>
        <Text style={styles.HeaderTitle}>Hello,</Text>
        <Text style={styles.HeaderUsername}>Sulthon Maulana Fathuddin</Text>
        <Text style={styles.HeaderDetailUser}>Staff Programmer 200007</Text>
      </View>
      <CardAttendance />
      <Activity />
    </HomeContainer>
  );
}

const styles = StyleSheet.create({
  HeaderTitle: {
    fontSize: 16,
    fontWeight: '200',
    color: 'black',
  },
  HeaderUsername: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  HeaderDetailUser: {
    fontSize: 12,
    color: 'black',
  },
});
