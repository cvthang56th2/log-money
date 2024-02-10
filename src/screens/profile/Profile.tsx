import {FC} from 'react';
import {Text} from 'react-native';

import Screen from '@lm/components/Screen';
import tw from '@lm/configs/tailwindcss';

interface IProfileProps {
  navigation: any;
}

const Profile: FC<IProfileProps> = ({navigation}) => {
  return (
    <Screen>
      <Text style={tw`text-white text-center font-bold uppercase text-xl`}>
        Profile Screen
      </Text>
    </Screen>
  );
};

export default Profile;
