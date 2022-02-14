import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import Logo from '../img/jastan.png';

import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import {Error} from '../components/Error';
import {AuthContainer} from '../components/AuthContainer';
import {AuthContext} from '../contexts/AuthContext';
import {Loading} from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function LoginScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Image style={styles.logo} source={Logo}/>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'Nip or Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Login'}
        style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await login(email, password);
          } catch (e) {
            setError('NIP or Password is wrong. Try Again');
            setLoading(false);
          }
        }}
      />
      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      {/* <TextButton
        title={'Have u an account? Create one'}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      /> */}
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 48,
    width: 200, 
    height: 50
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});
