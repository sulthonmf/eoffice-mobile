import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home';
import {Profile} from '../screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ActivityScreen } from '../screens/ActivityScreen';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <Tab.Navigator activeColor='#3A66FF' barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26}/>)
        }}
      />
      <Tab.Screen
        name={'Activity'}
        component={ActivityScreen}
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="text-box" color={color} size={24}/>)
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={26}/>)
        }}
      />
    </Tab.Navigator>
  );
}
