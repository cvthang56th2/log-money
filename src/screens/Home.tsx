import { FC } from "react";
import { Text } from "react-native";

import Screen from "@lm/components/Screen";
import tw from "@lm/configs/tailwindcss";

interface IHomePageProps {
  navigation: any;
}

const HomePage: FC<IHomePageProps> = ({ navigation }) => {
  return (
    <Screen>
      <Text
        style={tw`text-white text-center font-bold uppercase text-xl`}
      >
        Home Screen
      </Text>
    </Screen>
  );
};

export default HomePage;
