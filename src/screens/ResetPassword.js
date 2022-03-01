import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {HomeContainer} from '../components/HomeContainer';
import FormInput from '../components/FormInput';
import {Button} from 'react-native-paper';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';

export default function ResetPassword() {
  const {token} = useContext(UserContext);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const submitData = () => {
    const data = {
      old_password: currentPass,
      password: newPass,
      password_confirmation: confirmPass,
    };
    console.log(data);
    if (password == password_confirmation) {
      setError('');
      axios.post(`${BASE_URL}/apptest/api/account`, data, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
          setError(response.data.meta.message)
      });
    } else {
        setError('Konfirmasi password baru tidak sesuai')
    }
  };
  return (
    <HomeContainer>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          alignSelf: 'center',
          marginBottom: 80,
        }}>
        Reset Your Password
      </Text>
      <View>
        <FormInput
          titleInput={'Current Password'}
          onChangeText={value => setCurrentPass(value)}
        />
        <FormInput
          titleInput={'New Password'}
          onChangeText={value => setNewPass(value)}
        />
        <FormInput
          titleInput={'Confirm New Password'}
          onChangeText={value => setConfirmPass(value)}
        />
        <Error error={error}/>
        <Button style={{marginVertical: 20}} mode="contained" color="#0038FF">
          Save
        </Button>
      </View>
    </HomeContainer>
  );
}
