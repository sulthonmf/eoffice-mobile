import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {UserContext} from '../contexts/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {BASE_URL} from '../config';
import {Loading} from '../components/Loading';
import {HomeContainer} from '../components/HomeContainer';
import {ScrollView} from 'react-native-gesture-handler';
import FormInput from '../components/FormInput';
import {Picker} from '@react-native-picker/picker';
import {Error} from '../components/Error';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-paper';
//import {Attach} from 'react-native-vector-icons/MaterialIcons'

export default function UpdateActivity({route, navigation}) {
  const {token} = useContext(UserContext);
  const {itemId} = route.params;
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [logbookData, setLogbookData] = useState({});
  const [subjectData, setSubjectData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState();
  const [cdate, setCdate] = useState('');
  const [error, setError] = useState('');
  const [button, setButton] = useState('Attach');
  const [iconButton, setIconButton] = useState('attachment');

  const [subject, setSubject] = useState('');
  //const [status, setStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});
  const [output, setOutput] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [detailSubject, setDetailSubject] = useState('');
  //const [attachFile, setAttachFile] = useState({});

  const [multipleFile, setMultipleFile] = useState([]);

  const pickerRef = useRef();

  const statusLog = ['Pending', 'Hold', 'Finish'];
  //console.log(itemId)

  const getData = () => {
    if (itemId) {
      axios
        .get(`${BASE_URL}/apptest/api/logbook/${itemId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          //console.log(response.data);
          setLogbookData(response.data.log);
          setCdate(response.data.log.created_at.substring(0, 10));
          setSelectedStatus(response.data.log.status);
          setLoading(false);
        });
    } else {
      setVisible(true);
    }
  };

  const getSubject = () => {
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
  };

  useEffect(() => {
    getData(), getSubject();
  }, []);

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    if (button == 'Attach') {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
          //There can me more options as well find above
        });
        // for (const res of results) {
        //   //Printing the log realted to the file
        //   console.log('res : ' + JSON.stringify(res));
        //   console.log('URI : ' + res.uri);
        //   console.log('Type : ' + res.type);
        //   console.log('File Name : ' + res.name);
        //   console.log('File Size : ' + res.size);
        // }
        //Setting the state to show multiple file attributes
        setMultipleFile(results);
        console.log(multipleFile);
        setButton('Remove');
        setIconButton('delete');
      } catch (err) {
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          //If user canceled the document selection
          alert('Canceled from multiple doc picker');
        } else {
          //For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    } else {
      setMultipleFile([]);
      setButton('Attach');
      setIconButton('attachment');
      //console.log(multipleFile);
    }
  };

  const removeAttach = () => {
    setMultipleFile([]);
  };
  //console.log(subjectData);
  //console.log(selectedStatus)

  //const cdate = JSON.stringify(logbookData.created_at).substring(1, 11);

  const submitData = () => {
    const fileToUpload = multipleFile;
    const file = new FormData();
    file.append('featured_file', fileToUpload);
    console.log(file);
    // const data = {
    //   type_job_id: subjectType,
    //   subject,
    //   content: detailSubject,
    //   status: selectedStatus,
    //   output,
    //   featured_file: file,
    // };
    // try {
    //   axios
    //     .post(`${BASE_URL}/apptest/api/logbook/update/${itemId}`, data, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then(response => {
    //       console.log(response.data);
    //     });
    // } catch (error) {
    //   Alert('Gagal update data');
    // }
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
            <Text style={styles.modalText}>
              Terjadi Kesalahan Saat Mendapatkan Data
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setVisible(!visible) & navigation.goBack(setLogbookData({}))
              }>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            color: 'black',
            marginBottom: 10,
          }}>
          Activity Detail
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
      <ScrollView>
        <Text style={{color: 'black', marginBottom: 5}}>
          Activity No: {logbookData.log_no}
        </Text>
        <Text style={{color: 'black', marginBottom: 5}}>
          Create Date: {cdate}
        </Text>
        <FormInput
          editable={true}
          titleInput={'Subject'}
          value={logbookData.subject}
          onChangeText={value => setSubject(value)}
        />
        <Text style={{color: 'black', marginBottom: 5}}>Activity Type</Text>
        <Picker
          style={{borderRadius: 10, backgroundColor: '#EBEBEB'}}
          ref={pickerRef}
          selectedValue={
            selectedSubject ? selectedSubject : logbookData.type_job_id
          }
          onValueChange={(itemValue, itemIndex) =>
            //console.log(itemValue, itemIndex)
            setSelectedSubject(itemValue) & setSubjectType(itemIndex)
          }>
          {Object.keys(subjectData).map((key, index) => {
            return (
              <Picker.Item label={subjectData[key]} value={index} key={key} />
            );
          })}
        </Picker>
        <Text style={{color: 'black', marginBottom: 5}}>Activity Status</Text>
        <Picker
          style={{borderRadius: 10, backgroundColor: '#EBEBEB'}}
          ref={pickerRef}
          selectedValue={selectedStatus}
          onValueChange={itemValue =>
            setSelectedStatus(itemValue) & console.log(itemValue)
          }>
          {Object.values(statusLog).map(value => {
            return <Picker.Item label={value} value={value} key={value} />;
          })}
        </Picker>
        <FormInput
          editable={true}
          titleInput={'Detail Subject'}
          value={logbookData.content}
        />
        <FormInput
          editable={true}
          titleInput={'Output Subject'}
          value={logbookData.output}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 15,
            borderWidth: 1,
            borderRadius: 5,
          }}>
          {multipleFile.map((item, key) => (
            <View style={{flexDirection: 'column'}} key={key}>
              <Text style={{color: 'black', marginHorizontal: 5}}>
                {item.name ? item.name : 'No file attached'}
              </Text>
            </View>
          ))}
          <Button
            onPress={selectMultipleFile}
            color="#212121"
            mode="flat"
            icon={iconButton}>
            {button}
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            marginBottom: 50,
          }}>
          <Error error={error} />
          <Button
            onPress={submitData}
            style={{marginHorizontal: 5}}
            mode="contained"
            color="#0038FF">
            Update
          </Button>
          <Button
            style={{marginHorizontal: 5}}
            mode="contained"
            color="#f44336">
            Delete
          </Button>
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </HomeContainer>
  );
}

const styles = StyleSheet.create({
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
  headerDetail: {
    fontSize: 22,
  },
});
