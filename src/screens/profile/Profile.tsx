import {FC, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import Screen from '@lm/components/Screen';
import tw from '@lm/configs/tailwindcss';
import TransactionServices from '@lm/firebase/transaction/transaction.services';
import {Transaction} from '@lm/types/transaction';
import {formatDate, numberWithCommas} from '@lm/utils';
import {useTranslation} from 'react-i18next';
import {Row, Rows, Table} from 'react-native-table-component';

interface IProfileProps {
  navigation: any;
}

const Profile: FC<IProfileProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>(
    new Array(10).fill(0).map((_, index) => ({
      id: index.toString(),
      total: 1000,
      inputType: 'in',
      moneyType: 'cash',
      description: 'Mua sắm',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  );

  useEffect(() => {
    TransactionServices.getTransactionsSnapshot((snapshot: Transaction[]) => {
      setTransactions(snapshot);
    });
    return () => {
      TransactionServices.unsubscribeTransactions();
    };
  }, []);

  return (
    <Screen>
      <View style={tw`px-4 py-10`}>
        <Text style={tw`text-white text-center font-bold uppercase text-xl`}>
          {t('tab.profile')}
        </Text>
        <View style={tw`mt-4`}>
          <Text style={tw`text-white font-bold text-center mb-4`}>
            {t('transactionList.title')}
          </Text>
          <Table borderStyle={tw`border-2 border-gray-800`}>
            <Row
              data={[
                t('transactionList.columns.inputType'),
                t('transactionList.columns.moneyType'),
                t('transactionList.columns.total'),
                t('transactionList.columns.description'),
                t('transactionList.columns.createdAt'),
              ]}
              style={tw`bg-gray-800`}
              textStyle={tw`text-white text-center py-1`}
            />
            {transactions.length ? (
              <Rows
                data={transactions.map(transaction => [
                  transaction.inputType === 'in'
                    ? t('logMoneyForm.inputType.options.in')
                    : t('logMoneyForm.inputType.options.out'),
                  transaction.moneyType,
                  numberWithCommas(transaction.total),
                  transaction.description,
                  formatDate(transaction.createdAt, 'HH:mm DD/MM/YYYY'),
                ])}
                textStyle={tw`text-white text-center p-1`}
              />
            ) : (
              <Row
                data={[t('transactionList.noData')]}
                textStyle={tw`text-white text-center py-1`}
              />
            )}
          </Table>
        </View>
      </View>
    </Screen>
  );
};

export default Profile;
