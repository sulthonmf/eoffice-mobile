import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home';
import {Profile} from '../screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ActivityScreen } from '../screens/ActivityScreen';
import AddActivity from '../screens/AddActivity';
import UpdateActivity from '../screens/UpdateActivity';
import ResetPassword from '../screens/ResetPassword';

const TabStack = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();

function HomeStack(){
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Tab}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="addActivity"
        component={AddActivity}
        options={{
          title: 'addActivity',
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="updateActivity"
        component={UpdateActivity}
        options={{
          title: 'updateActivity',
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{
          title: 'resetPassword',
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  )
}

function Tab(){
  return (
    <TabStack.Navigator activeColor='#3A66FF' barStyle={{backgroundColor: '#ffffff'}}>
      <TabStack.Screen
        name={'Dashboard'}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26}/>)
        }}
      />
      <TabStack.Screen
        name={'Activity'}
        component={ActivityScreen}
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="text-box" color={color} size={24}/>)
        }}
      />
      <TabStack.Screen
        name={'Profile'}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={26}/>)
        }}
      />
    </TabStack.Navigator>
  )
}

export function MainStackNavigator() {
  return (
    <HomeStack />
  );
}
