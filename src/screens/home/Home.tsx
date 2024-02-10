import {FC, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import Screen from '@lm/components/Screen';
import tw from '@lm/configs/tailwindcss';

interface IHomePageProps {}

const HomePage: FC<IHomePageProps> = () => {
  const [formData, setFormData] = useState({
    total: 0,
    type: 'in',
    subType: '',
    description: '',
  });
  return (
    <Screen>
      <View style={tw`p-4`}>
        <Text style={tw`text-white text-center font-bold uppercase text-30px`}>
          MONEY LOGGER
        </Text>
        <View style={tw`py-6`}>
          <View>
            <Text style={tw`text-white font-semibold text-18px mb-2`}>
              Total
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
              style={tw`border-1 border-white rounded-md px-2 py-1 text-20px text-white`}
            />
          </View>
          <View style={tw`mt-5`}>
            <Text style={tw`text-white font-semibold text-18px mb-2`}>
              In / Out
            </Text>
            <TextInput
              onChangeText={val => setFormData(prev => ({...prev, type: val}))}
              value={formData.type}
              placeholder="In / Out"
              style={tw`border-1 border-white rounded-md px-2 py-1 text-20px text-white`}
            />
          </View>
          <View style={tw`mt-5`}>
            <Text style={tw`text-white font-semibold text-18px mb-2`}>
              For what?
            </Text>
            <TextInput
              onChangeText={val =>
                setFormData(prev => ({...prev, subType: val}))
              }
              value={formData.subType}
              placeholder="For what?"
              style={tw`border-1 border-white rounded-md px-2 py-1 text-20px text-white`}
            />
          </View>
          <View style={tw`mt-5`}>
            <Text style={tw`text-white font-semibold text-18px mb-2`}>
              Description
            </Text>
            <TextInput
              onChangeText={val =>
                setFormData(prev => ({...prev, description: val}))
              }
              value={formData.description}
              placeholder="Description"
              style={tw`border-1 border-white rounded-md px-2 py-1 text-20px text-white`}
            />
          </View>
          <View style={tw`flex flex-row justify-center mt-6`}>
            <Pressable style={tw`bg-white px-10 py-2 rounded-md`}>
              <Text style={tw`text-20px font-bold`}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default HomePage;
