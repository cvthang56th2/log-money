import {FC, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown';

import Screen from '@lm/components/Screen';
import tw from '@lm/configs/tailwindcss';
import {useTranslation} from 'react-i18next';

interface IHomePageProps {}

const HomePage: FC<IHomePageProps> = () => {
  const {t} = useTranslation();
  const [formData, setFormData] = useState({
    total: 0,
    inputType: 'in',
    moneyType: 'cash',
    description: '',
  });
  const radioButtons = [
    {
      id: 'in',
      label: t('logMoneyForm.inputType.options.in'),
      value: 'in',
      color: 'white',
    },
    {
      id: 'out',
      label: t('logMoneyForm.inputType.options.out'),
      value: 'out',
      color: 'white',
    },
  ];
  const moneyTypes = [
    {label: 'Cash', value: 'cash'},
    {label: 'Bank', value: 'bank'},
    {label: 'MOMO', value: 'momo'},
  ];

  return (
    <Screen>
      <View>
        <Text
          style={tw`mt-10 text-white text-center font-bold uppercase text-30px`}>
          {t('home.title')}
        </Text>
        <View style={tw`px-10 mt-10`}>
          <View style={tw`flex flex-row justify-between items-center`}>
            <View style={tw`w-2/3`}>
              <View style={tw`-ml-2`}>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={val =>
                    setFormData(prev => ({...prev, inputType: val}))
                  }
                  labelStyle={tw`text-white font-bold`}
                  containerStyle={tw`flex flex-row w-full`}
                  selectedId={formData.inputType}
                />
              </View>
            </View>
            <View style={tw`w-1/3`}>
              <SelectDropdown
                data={moneyTypes}
                defaultValue={moneyTypes.find(
                  item => item.value === formData.moneyType,
                )}
                onSelect={selectedItem => {
                  setFormData(prev => ({
                    ...prev,
                    moneyType: selectedItem.value,
                  }));
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem.label;
                }}
                rowTextForSelection={item => {
                  return item.label;
                }}
                buttonStyle={tw`border-1 border-white rounded-md mt-1 text-20px bg-transparent w-full h-8`}
                buttonTextStyle={tw`text-white`}
              />
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-white font-semibold text-18px mb-2`}>
              {t('logMoneyForm.total.label')}
            </Text>
            <TextInput
              onChangeText={val =>
                setFormData(prev => ({
                  ...prev,
                  total: !Number.isNaN(Number(val)) ? Number(val) : prev.total,
                }))
              }
              value={String(formData.total)}
              keyboardType="numeric"
              placeholder="Total"
              style={tw`border-1 border-white rounded-md p-4 mt-1 text-20px text-white`}
            />
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-white font-semibold text-18px mb-2`}>
              {t('logMoneyForm.description.label')}
            </Text>
            <TextInput
              onChangeText={val =>
                setFormData(prev => ({...prev, description: val}))
              }
              multiline
              value={formData.description}
              placeholder={t('logMoneyForm.description.placeholder')}
              style={tw`border-1 border-white rounded-md p-4 mt-1 text-20px text-white`}
            />
          </View>
          <View style={tw`flex flex-row justify-center mt-12`}>
            <Pressable style={tw`bg-white px-10 py-2 rounded-md`}>
              <Text style={tw`text-20px font-bold`}>
                {t('logMoneyForm.submit')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default HomePage;
