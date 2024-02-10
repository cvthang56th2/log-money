/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import tw from '@lm/configs/tailwindcss';
import RootNavigator from '@lm/navigations/rootNavigators';
import '@lm/localization/i18n';

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
    </SafeAreaProvider>
  );
}

export default App;
