import {
  setDoc,
  getDocs,
  doc,
  query,
  orderBy,
  where,
  collection,
  onSnapshot,
  Timestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {db} from '../config';
import {uid} from 'uid';
import {snapshotToArray} from '@lm/utils';

const TRANSACTION = 'transactions';

class TransactionServices {
  unsubscribeTransactions: any;
  async createTransaction(data: Record<string, any>) {
    return new Promise(function (resolve, reject) {
      try {
        const id = data.id || uid(8);
        const today = new Date();
        const ref = doc(db, TRANSACTION, id);
        data.id = id;
        return resolve(
          setDoc(ref, {
            updatedAt: Timestamp.fromDate(today),
            createdAt: Timestamp.fromDate(today),
            ...data,
          }),
        );
      } catch (err) {
        console.error('error create transaction', err);
        reject(err);
      }
    });
  }

  async updateTransaction(transactionId: string, data: Record<string, any>) {
    return new Promise(function (resolve, reject) {
      try {
        const today = new Date();
        const ref = doc(db, TRANSACTION, transactionId);
        return resolve(
          updateDoc(ref, {
            updatedAt: Timestamp.fromDate(today),
            ...data,
          }),
        );
      } catch (err) {
        console.error('error update transaction', err);
        reject(err);
      }
    });
  }

  async deleteTransaction(transactionId: string) {
    return new Promise(function (resolve, reject) {
      try {
        const ref = doc(db, TRANSACTION, transactionId);
        return resolve(deleteDoc(ref));
      } catch (err) {
        console.error('error delete transaction', err);
        reject(err);
      }
    });
  }

  async getAllTransactions() {
    try {
      const q = query(collection(db, TRANSACTION), orderBy('createdAt'));
      const querySnapshot = await getDocs(q);
      return snapshotToArray(querySnapshot as any);
    } catch (error) {
      console.log('error', error);
    }
  }

  getTransactionsSnapshot(callback: (arg0: any[]) => void, status?: string) {
    let q;
    if (status) {
      q = query(
        collection(db, TRANSACTION),
        orderBy('createdAt', 'desc'),
        where('status', '==', status),
      );
    } else {
      q = query(collection(db, TRANSACTION), orderBy('createdAt', 'desc'));
    }
    if (typeof this.unsubscribeTransactions === 'function') {
      this.unsubscribeTransactions();
    }
    this.unsubscribeTransactions = onSnapshot(q, querySnapshot => {
      if (typeof callback === 'function') {
        callback(snapshotToArray(querySnapshot as any));
      }
    });
  }
}

export default new TransactionServices();
