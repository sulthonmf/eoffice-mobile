import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export function ProfileInput({children, style, ...props}) {
  return (
    <View>
      <TextInput
        {...props}
        editable={false}
        selectTextOnFocus={false}
        style={[styles.input, style]}
        placeholderTextColor={'darkgray'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F3F1F1',
    width: '100%',
    padding: '4%',
    borderRadius: 8,
    color: 'black',
    marginBottom: '5%',
  },
});
