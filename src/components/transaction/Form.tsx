import {Dispatch, FC, SetStateAction} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown';

import tw from '@lm/configs/tailwindcss';
import {TransactionForm as TransactionFormType} from '@lm/types/transaction';
import {useTranslation} from 'react-i18next';

type TransactionFormProps = {
  formData?: TransactionFormType;
  setFormData: Dispatch<SetStateAction<TransactionFormType>>;
  onSubmit: (formData: TransactionFormType) => void;
};

export const defaultFormData = {
  id: '',
  total: 0,
  inputType: 'out',
  moneyType: 'cash',
  description: '',
  spentAt: new Date(),
};

const TransactionForm: FC<TransactionFormProps> = ({
  onSubmit,
  formData = defaultFormData,
  setFormData,
}) => {
  const {t} = useTranslation();

  const radioButtons = [
    {
      id: 'out',
      label: t('logMoneyForm.inputType.options.out'),
      value: 'out',
      color: 'white',
    },
    {
      id: 'in',
      label: t('logMoneyForm.inputType.options.in'),
      value: 'in',
      color: 'white',
    },
  ];
  const moneyTypes = [
    {label: 'Cash', value: 'cash'},
    {label: 'Bank', value: 'bank'},
    {label: 'MOMO', value: 'momo'},
  ];

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
      <View style={tw`mt-4`}>
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
          style={tw`border-1 border-white rounded-md px-4 py-2 mt-1 text-20px text-white`}
        />
      </View>
      <View style={tw`mt-4`}>
        <Text style={tw`text-white font-semibold text-18px mb-2`}>
          {t('logMoneyForm.description.label')}
        </Text>
        <TextInput
          onChangeText={val =>
            setFormData(prev => ({...prev, description: val}))
          }
          value={formData.description}
          placeholder={t('logMoneyForm.description.placeholder')}
          style={tw`border-1 border-white rounded-md px-4 py-2 mt-1 text-20px text-white`}
        />
      </View>
      <View style={tw`flex flex-row justify-center mt-12`}>
        <Pressable
          style={tw`bg-white px-10 py-2 rounded-md`}
          onPress={() => onSubmit(formData)}>
          <Text style={tw`text-20px font-bold`}>
            {formData.id ? t('logMoneyForm.update') : t('logMoneyForm.submit')}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default TransactionForm;
