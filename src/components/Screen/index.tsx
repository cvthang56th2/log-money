import React, {ReactNode, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import tw from '@lm/configs/tailwindcss';
import {ScrollViewProvider} from '@lm/contexts/ScrollViewContext';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

type TProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[];
};

export default function Screen(props: TProps) {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <View
      style={tw.style('flex-1 flex flex-col bg-[#1a1a23]', {
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      })}>
      <ScrollViewProvider scrollViewRef={scrollViewRef}>
        <ScrollView style={tw`grow`} ref={scrollViewRef}>
          <Header />
          {props.children}
          <Footer />
        </ScrollView>
      </ScrollViewProvider>
    </View>
  );
}
