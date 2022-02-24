import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export function CardAttendance() {
  const {token} = useContext(UserContext);
  const [times, setTime] = useState({});
  const [visible, setVisible] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState(null);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
      Geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },error => setError({ error: error.message}), {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000});
      axios
        .get(`${BASE_URL}/apptest/api/attendance`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setTime(response.data.meta.message);
        })
        .catch(error => console.log(error));
  }, []);

  //console.log(latitude)
  //console.log(longitude)

  const takeAbsen = async () => {
    //console.log(token)
    const data = {
      longitude,
      latitude
    }

    try {
      axios
        .post(`${BASE_URL}/apptest/api/attendance/absence`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(response => {
          console.log(response.data)
          if (response.data.meta.code == 200) {
            setVisible(true);
          }
        });
    } catch (error) {
      alert('An error has occured');
      setVisible(false);
    }
  };

  return (
    <View style={{marginVertical: 15}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Attendance Success</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.Wrapper}>
        <View style={styles.timeWrapper}>
          <Text style={{fontSize: 12, fontWeight: '800', color: 'black'}}>
            Check In Time
          </Text>
          <Text style={{fontSize: 14, color: 'black'}}>
            {times.checkin === false ? 'Belum Absen Masuk' : times.checkin}
          </Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={{fontSize: 12, fontWeight: '800', color: 'black'}}>
            Check Out Time
          </Text>
          <Text style={{fontSize: 14, color: 'black'}}>
            {times.checkout === false ? 'Belum Absen Keluar' : times.checkout}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => takeAbsen()}
        style={{
          justifyContent: 'center',
          backgroundColor: '#3A66FF',
          height: 40,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            alignSelf: 'center',
            fontWeight: '400',
            color: 'white',
          }}>
          TAKE ATTENDANCE
        </Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  timeWrapper: {alignItems: 'center'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
