import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Activity } from '../components/Activity';
import {CardAttendance} from '../components/CardAttendance';
import {HomeContainer} from '../components/HomeContainer';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { BASE_URL } from '../config';

export function HomeScreen({navigation}) {
  const {token} = React.useContext(UserContext);
  const [users, setUsers] = React.useState({});

  React.useEffect(() => {
    axios
          .get(`${BASE_URL}/apptest/api/user`, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            setUsers(response.data)
          })
  },[])

  return (
    <HomeContainer>
      <View>
        <Text style={styles.HeaderTitle}>Hello,</Text>
        <Text style={styles.HeaderUsername}>{users.name}</Text>
        <Text style={styles.HeaderDetailUser}>{users.position} {users.nid}</Text>
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
