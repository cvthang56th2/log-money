import TransactionServices from '@lm/firebase/transaction/transaction.services';
import {FC, useState} from 'react';
import {Text, View} from 'react-native';

import Screen from '@lm/components/Screen';
import TransactionForm, {
  defaultFormData,
} from '@lm/components/transaction/Form';
import tw from '@lm/configs/tailwindcss';
import {TransactionForm as TransactionFormType} from '@lm/types/transaction';
import {useTranslation} from 'react-i18next';
import {showMessage} from 'react-native-flash-message';

interface IHomePageProps {}

const HomePage: FC<IHomePageProps> = () => {
  const {t} = useTranslation();
  const [formData, setFormData] = useState<TransactionFormType>(
    JSON.parse(JSON.stringify(defaultFormData)),
  );

  const submit = async () => {
    try {
      // TODO: use form validation library
      const {total, description} = formData;
      if (total <= 0 || description === '') {
        showMessage({
          message: t('logMoneyForm.formInvalid', {
            message: [
              total <= 0 ? t('logMoneyForm.total.invalid') : '',
              description === '' ? t('logMoneyForm.description.invalid') : '',
            ]
              .filter(Boolean)
              .join(', '),
          }),
          type: 'danger',
        });
        return;
      }
      await TransactionServices.createTransaction(formData);
      setFormData(JSON.parse(JSON.stringify(defaultFormData)));
      showMessage({
        message: t('logMoneyForm.submitSuccess'),
        type: 'success',
      });
    } catch (error) {
      console.log('error', error);
      showMessage({
        message: t('logMoneyForm.submitFailed'),
        type: 'danger',
      });
    }
  };

  return (
    <Screen>
      <View>
        <Text
          style={tw`mt-10 text-white text-center font-bold uppercase text-30px`}>
          {t('home.title')}
        </Text>
        <View style={tw`px-10 mt-10`}>
          <TransactionForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={submit}
          />
        </View>
      </View>
    </Screen>
  );
};

export default HomePage;
