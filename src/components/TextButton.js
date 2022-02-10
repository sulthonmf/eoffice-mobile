import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export function TextButton({title, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <MaterialIcon name="lock" style={{paddingVertical: 3, marginStart: '-50%' ,marginRight: '3%'}} size={15}/>
      <Text style={[styles.text, {color: '#0A0A0A'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
});
