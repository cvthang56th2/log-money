import React from 'react';
import {Text} from 'react-native';
import MainStackNavigators from './mainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default function RootNavigator() {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <MainStackNavigators />
    </NavigationContainer>
  );
}
