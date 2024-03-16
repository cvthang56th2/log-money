/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import tw from '@lm/configs/tailwindcss';
import '@lm/localization/i18n';
import RootNavigator from '@lm/navigations/rootNavigators';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider
      style={tw`bg-black`}
      initialMetrics={initialWindowMetrics}>
      <StatusBar
        animated={true}
        showHideTransition="slide"
        barStyle={'light-content'}
      />
      <RootNavigator />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}

export default App;
