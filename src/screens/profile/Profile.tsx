import {FC} from 'react';
import {Text, View} from 'react-native';

import Screen from '@lm/components/Screen';
import tw from '@lm/configs/tailwindcss';
import {useTranslation} from 'react-i18next';

interface IProfileProps {
  navigation: any;
}

const Profile: FC<IProfileProps> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <Screen>
      <View style={tw`px-4 py-10`}>
        <Text style={tw`text-white text-center font-bold uppercase text-xl`}>
          {t('tab.profile')}
        </Text>
      </View>
    </Screen>
  );
};

export default Profile;
