import {Dispatch, FC, SetStateAction, createRef, useState} from 'react';
import {Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown';

import tw from '@lm/configs/tailwindcss';
import {TransactionForm as TransactionFormType} from '@lm/types/transaction';
import {toLowerCaseNonAccentVietnamese} from '@lm/utils';
import {useTranslation} from 'react-i18next';

type TransactionFormProps = {
  formData: TransactionFormType;
  setFormData: Dispatch<SetStateAction<TransactionFormType>>;
  onSubmit: (formData: TransactionFormType) => void;
};

export const defaultFormData = {
  total: 0,
  inputType: 'in',
  moneyType: 'cash',
  description: '',
};

const TransactionForm: FC<TransactionFormProps> = ({
  onSubmit,
  formData,
  setFormData,
}) => {
  const {t} = useTranslation();
  const [isFocusingDescription, setIsFocusingDescription] = useState(false);
  const textInputRef = createRef<TextInput>();

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

  const descriptionSuggestions = [
    {id: '1', title: 'Mua sắm'},
    {id: '2', title: 'Ăn uống'},
    {id: '3', title: 'Đi chợ'},
    {id: '4', title: 'Đi chơi'},
    {id: '5', title: 'Đi ăn'},
    {id: '6', title: 'Cho mượn'},
    {id: '7', title: 'Lương'},
  ];

  const filterData = (query: string) => {
    if (!isFocusingDescription || query === '') {
      return [];
    }
    const formattedQuery = toLowerCaseNonAccentVietnamese(query);
    const result = descriptionSuggestions.filter(item =>
      toLowerCaseNonAccentVietnamese(item.title).includes(formattedQuery),
    );
    if (result.length === 1 && result[0].title === query) {
      return [];
    }
    return result;
  };

  return (
    <>
      <View style={tw`flex flex-row justify-between items-center`}>
        <View style={tw`w-2/3`}>
          <View style={tw`-ml-2`}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={val => setFormData(prev => ({...prev, inputType: val}))}
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
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={tw`mb-4`}
          data={filterData(formData.description)}
          defaultValue={formData.description}
          onChangeText={val =>
            setFormData(prev => ({...prev, description: val}))
          }
          placeholder={t('logMoneyForm.description.placeholder')}
          flatListProps={{
            keyboardShouldPersistTaps: 'always',
            keyExtractor: item => item.id,
            renderItem: ({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setFormData(prev => ({...prev, description: item.title}));
                  textInputRef.current?.blur();
                }}>
                <Text style={tw`p-2 border-b-gray-400`}>{item.title}</Text>
              </TouchableOpacity>
            ),
          }}
          inputContainerStyle={tw`border-0`}
          renderTextInput={() => (
            <TextInput
              ref={textInputRef}
              style={tw`border-1 border-white rounded-md p-4 mt-1 text-20px text-white`}
              placeholder={t('logMoneyForm.description.placeholder')}
              value={formData.description}
              onFocus={() => setIsFocusingDescription(true)}
              onBlur={() => setIsFocusingDescription(false)}
              onChangeText={val =>
                setFormData(prev => ({...prev, description: val}))
              }
            />
          )}
        />
      </View>
      <View style={tw`flex flex-row justify-center mt-12`}>
        <Pressable
          style={tw`bg-white px-10 py-2 rounded-md`}
          onPress={() => onSubmit(formData)}>
          <Text style={tw`text-20px font-bold`}>
            {t('logMoneyForm.submit')}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default TransactionForm;
