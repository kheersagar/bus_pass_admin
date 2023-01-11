import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import Login from "./screens/Login";
import React from 'react'
import { useSelector } from 'react-redux';
import Profile from './screens/Profile';
import PassList from './screens/PassList';
import UserInfo from './screens/UserInfo';
import CreateUser from './screens/CreateUser';
import AddValidator from './screens/AddValidator';
import ForgotPassword from './screens/ForgotPassword';
import { navigationRef } from './RootNavigation';

const NavigationProvider = () => {
  const Stack = createNativeStackNavigator();
  const { isAuth } = useSelector(state => state.user)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator >
        {isAuth ?
          <>
            <Stack.Screen name="Home" component={Home} options={{
              headerShown: false
            }} />
            <Stack.Screen name="update-pass" component={PassList} options={{
              headerShown: false
            }} />
            <Stack.Screen name="user-info" component={UserInfo} options={{
              headerShown: false
            }} />
            <Stack.Screen name="create-user" component={CreateUser} options={{
              headerShown: false
            }} />
            <Stack.Screen name="add-validator" component={AddValidator} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="test" component={Profile} options={{
              headerShown: false,
            }} />
          </>
          :
          <>
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false
          }} />
          <Stack.Screen name="forgot-password" component={ForgotPassword}  options={{
            headerShown: false,
          }} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationProvider