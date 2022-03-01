import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {HomeContainer} from '../components/HomeContainer';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../components/FormInput';
import {Loading} from '../components/Loading';
import axios from 'axios';
import {BASE_URL} from '../config';
import {UserContext} from '../contexts/UserContext';
import {Error} from '../components/Error';
import {Picker} from '@react-native-picker/picker';

export default function AddActivity({navigation}) {
  const {token} = useContext(UserContext);
  const [button, setButton] = useState('SAVE');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [subjectData, setSubjectData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState();
  const [detailSubject, setDetailSubject] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState('');

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/apptest/api/logbook/job`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        //console.log(response.data);
        setSubjectData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  //console.log(subjectData);

  const submit = () => {
    //setLoading(true);
    const data = {
      type_job_id: subjectType,
      subject,
      content: detailSubject,
    };
    console.log(data);
    if (data.type_job_id !== '' || data.subject !== '' || data.content !== '') {
      setError('');
      axios
        .post(`${BASE_URL}/apptest/api/logbook/create`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          //console.log(response);
          if (response.status === 200) {
            setLoading(false);
            setVisible(true);
          }
        });
    } else {
      setLoading(false);
      setError('Data Tidak Boleh Kosong');
    }
  };
  return (
    <HomeContainer>
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
            <Text style={styles.modalText}>Add Activity Success!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible) && navigation.goBack()}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 22, fontWeight: '600', color: 'black'}}>
            Add New Activity
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{justifyContent: 'center', alignSelf: 'center'}}
              name="close"
              color="black"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <FormInput
          titleInput={'Subject'}
          value={subject}
          onChangeText={value => setSubject(value)}
        />
        <Text style={{color: 'black', marginBottom: 5}}>Activity Type</Text>
        <Picker
          style={{borderRadius: 10, backgroundColor: '#EBEBEB'}}
          ref={pickerRef}
          selectedValue={selectedSubject}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSubject(itemValue) &
            setSubjectType(itemIndex)
          }>
              {Object.keys(subjectData).map((key, index) => {
                return (
                  <Picker.Item label={subjectData[key]} value={index} key={key} />
                )
              })}
        </Picker>
        <FormInput
          titleInput={'Detail Activity'}
          height={80}
          value={detailSubject}
          onChangeText={value => setDetailSubject(value)}
        />
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Error error={error} />
          <TouchableOpacity
            onPress={submit}
            style={{
              backgroundColor: '#0038FF',
              width: 100,
              height: 40,
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', alignSelf: 'center'}}>{button}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </HomeContainer>
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
