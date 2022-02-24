import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import ActivityButton from './ActivityButton';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';

export function Activity() {
  const {token} = useContext(UserContext);
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);
  const [decline, setDecline] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios
  //       .get(`${BASE_URL}/apptest/api/logbook`, {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(response => {
  //         //console.log(response);
  //         //setLogbookData(response.data);
  //         //etLoading(false);
  //         if (response.status === 200) {
  //           for (var i = 0; i < response.data.approved; i++) {
            
  //           }
  //         }
  //       })
  //       .catch(error => console.log(error));
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View>
      <Text style={styles.titleText}>Logbook Activities</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ActivityButton
          icon="pending-actions"
          counter={pending}
          status="On Pending"
          color="#FF993A"
        />
        <ActivityButton
          icon="done"
          counter={done}
          status="Done"
          color="#65BF8C"
        />
        <ActivityButton
          icon="cancel"
          counter={decline}
          status="Decline"
          color="#FF3A3A"
        />
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
    alignItems: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
