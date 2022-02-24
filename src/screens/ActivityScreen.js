import React from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActivityCard from '../components/ActivityCard';
import {HomeContainer} from '../components/HomeContainer';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import {Loading} from '../components/Loading';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export function ActivityScreen({navigation}) {
  const {token} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [logbookData, setLogbookData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    //const interval = setInterval(() => {
      axios
        .get(`${BASE_URL}/apptest/api/logbook`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          //console.log(response);
          setLogbookData(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    // }, 2000);
    // return () => clearInterval(interval);
  }, []);

  const selectedItem = (item) => {
    console.log(item)
  }

  return (
    <HomeContainer>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.activityTitle}>My Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('addActivity')}>
            <Text style={{color: 'blue'}}>Add New</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.recentTitle}>Recent</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {logbookData.map(logbook => {
          return (
            <ActivityCard
              onPress={() => navigation.navigate('updateActivity', {
                itemId: logbook.id
              })}
              key={logbook.id}
              subject={logbook.subject}
              date={logbook.created_at.substring(0, 10)}
              status={logbook.status}
              approved={logbook.approved === 'Y' ? 'Approved' : 'Pending'}
              color={logbook.approved === 'Y' ? '#65BF8C' : '#FF3A3A'}
            />
          );
        })}
      </ScrollView>
      <Loading loading={loading} />
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
    paddingTop: 12,
  },
});
