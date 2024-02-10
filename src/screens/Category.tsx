import Screen from "@lm/components/Screen";
import tw from "@lm/configs/tailwindcss";
import { RootStackParamList } from "@lm/navigations/mainStackNavigator";
import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { Text } from "react-native";

interface ICategoryProps {
  navigation: any;
  route: RouteProp<RootStackParamList, "Category">;
}

const Category: FC<ICategoryProps> = ({ navigation, route }) => {
  return (
    <Screen>
      <Text style={tw`text-white text-center text-2xl p-10`}>
        Category Screen
      </Text>
    </Screen>
  );
};

export default Category;
