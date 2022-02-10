import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ActivityButton({counter, status, icon}) {
  return (
    <View>
      <TouchableOpacity style={styles.buttonWrap}>
          <View style={styles.buttonContent}>
            <MaterialIcons name={icon} color="white" size={26}/>
            <Text style={{color: 'white'}}>{counter}</Text>
            <Text style={{color: 'white'}}>{status}</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonWrap: {
        backgroundColor: '#3A66FF',
        borderRadius: 5,
        width: 100,
        height: 100,
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    counterText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400'
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
