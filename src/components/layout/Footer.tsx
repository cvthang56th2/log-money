import { Text, View } from "react-native";
import tw from "@lm/configs/tailwindcss";

const Footer = () => {
  return (
    <View>
      <Text
        style={tw`text-white text-xl font-bold text-19px mb-15px leading-32px`}
      >
        FOOTER
      </Text>
    </View>
  );
};

export default Footer;
