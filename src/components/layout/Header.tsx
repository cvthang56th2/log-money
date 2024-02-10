import { Text, View } from "react-native";
import React from "react";
import NavBar from "./NavBar";
import tw from "@lm/configs/tailwindcss";

const Header = () => {
  return (
    <View>
      <View style={tw`bg-black py-4`}>
        <Text
          style={tw`text-center text-white font-bold text-2xl`}
        >
          LOG MONEY
        </Text>
      </View>
      <NavBar />
    </View>
  );
};

export default Header;
