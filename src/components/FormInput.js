import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

export default function FormInput({
  titleInput,
  placeholder,
  height,
  value,
  onChangeText,
  editable,
  label,
  right
}) {
  return (
    <View style={{marginVertical: 10}}>
      <Text style={{color: 'black', marginBottom: 5}}>{titleInput}</Text>
      <TextInput
        right={<TextInput.Icon name={right} />}
        label={label}
        mode="outlined"
        disable={editable}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        placeholder={placeholder}
        style={{backgroundColor: '#EBEBEB', textAlignVertical: 'center'}}
      />
    </View>
  );
}
