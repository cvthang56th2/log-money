import {FC, useEffect, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Screen from '@lm/components/Screen';
import TransactionForm from '@lm/components/transaction/Form';
import tw from '@lm/configs/tailwindcss';
import TransactionServices from '@lm/firebase/transaction/transaction.services';
import {
  Transaction,
  TransactionForm as TransactionFormType,
} from '@lm/types/transaction';
import {formatDate, numberWithCommas} from '@lm/utils';
import {useTranslation} from 'react-i18next';
import {showMessage} from 'react-native-flash-message';
import Modal from 'react-native-modal';
import {Row, Rows, Table} from 'react-native-table-component';

interface IProfileProps {
  navigation: any;
}

const Profile: FC<IProfileProps> = () => {
  const {t} = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionFormType>();

  const showUpdateTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };
  const updateTransaction = (formData: any) => {
    delete formData.createdAt;
    delete formData.updatedAt;

    TransactionServices.updateTransaction(formData.id, formData)
      .then(() => {
        showMessage({
          message: t('transactionList.update.success'),
          type: 'success',
        });
        setEditingTransaction(undefined);
      })
      .catch(() => {
        showMessage({
          message: t('transactionList.update.failed'),
          type: 'danger',
        });
      });
  };
  const removeTransaction = (id: string) => {
    Alert.alert(
      t('transactionList.remove.confirmTitle'),
      t('transactionList.remove.confirmMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.confirm'),
          onPress: async () => {
            try {
              await TransactionServices.deleteTransaction(id);
              showMessage({
                message: t('transactionList.remove.success'),
                type: 'success',
              });
            } catch (error) {
              showMessage({
                message: t('transactionList.remove.failed'),
                type: 'danger',
              });
            }
          },
        },
      ],
    );
  };

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
                t('transactionList.columns.actions'),
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
                  <View>
                    <Text
                      style={tw`text-white text-center underline`}
                      onPress={() => showUpdateTransaction(transaction)}>
                      {t('transactionList.update.label')}
                    </Text>
                    <Text
                      style={tw`text-white text-center underline mt-2`}
                      onPress={() => removeTransaction(transaction.id)}>
                      {t('transactionList.remove.label')}
                    </Text>
                  </View>,
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
      <Modal isVisible={!!editingTransaction}>
        <TouchableOpacity
          activeOpacity={1}
          style={tw`flex-1 justify-center items-center`}
          onPressOut={() => {
            setEditingTransaction(undefined);
          }}>
          <TouchableWithoutFeedback>
            <View style={tw`bg-gray-900 rounded-xl px-4 py-6`}>
              <Text
                style={tw`text-20px font-bold text-center text-white mb-10`}>
                {t('transactionList.updateModal.title')}
              </Text>
              <TransactionForm
                formData={editingTransaction}
                setFormData={setEditingTransaction as any}
                onSubmit={updateTransaction}
              />
              {/* <Button title="Hide modal" onPress={toggleModal} /> */}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
};

export default Profile;
