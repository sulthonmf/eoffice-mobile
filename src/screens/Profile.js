import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { FilledButton } from '../components/FilledButton';
import {ProfileContainer} from '../components/ProfileContainer';
import {ProfileInput} from '../components/ProfileInput';
import {TextButton} from '../components/TextButton';
import { AuthContext } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { BASE_URL } from '../config';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

export function Profile({navigation}) {
    const {logout} = React.useContext(AuthContext);
    const {token} = React.useContext(UserContext);
    // console.log(token)
    const [users, setUsers] = useState({});
    // const responseJson = useProfile('/apptest/api/user')
    // const users = JSON.stringify(responseJson)
    React.useEffect(() => {
        axios
            .get(`${BASE_URL}/apptest/api/user`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                //console.log(response)
                setUsers(response.data)
            })
    }, [])
  return (
    <ProfileContainer>
      <Text style={styles.title}>My Profile</Text>
      <ScrollView>
        <Text style={styles.subTitle}>Name</Text>
        <ProfileInput value={users.name} />
        <Text style={styles.subTitle}>Nip</Text>
        <ProfileInput value={users.nid}/>
        <Text style={styles.subTitle}>Email</Text>
        <ProfileInput value={users.email}/>
        <Text style={styles.subTitle}>Position</Text>
        <ProfileInput value={users.position}/>
        <View style={{backgroundColor: '#E3E3E3', width: 100}} />
        <Text style={{fontSize: 20, color: '#0A0A0A', marginTop: '10%'}}>
          Security
        </Text>
        <TextButton
          title={'Change Password'}
          onPress={() => {
            navigation.navigate('Registration');
          }}
        />
        <FilledButton
        title={'Logout'}
        style={styles.loginButton}
        onPress={() => {
              logout();
            }}
      />
      </ScrollView>
    </ProfileContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
    fontSize: 24,
    color: 'black',
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  subTitle: {
    color: 'black',
  },
});
