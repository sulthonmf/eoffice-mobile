import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ActivityButton({counter, status, icon, color}) {
  return (
    <View>
      <TouchableOpacity style={[styles.buttonWrap, {backgroundColor: color}]}>
          <View style={[styles.buttonContent]}>
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
        //justifyContent: 'center'
    }
})
