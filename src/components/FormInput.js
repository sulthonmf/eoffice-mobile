import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

export default function FormInput({
  titleInput,
  placeholder,
  height,
  value,
  onChangeText,
}) {
  return (
    <View style={{marginVertical: 10}}>
      <Text style={{color: 'black', marginBottom: 5}}>{titleInput}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        placeholder={placeholder}
        style={{backgroundColor: '#EBEBEB', borderRadius: 5, height: height}}
      />
    </View>
  );
}
