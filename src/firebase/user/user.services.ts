import {
  setDoc,
  doc,
  Timestamp,
  onSnapshot,
  getDoc,
  getDocs,
  collection,
  query,
} from 'firebase/firestore';
import {db} from '../config';
import {snapshotToArray} from '@lm/utils';
const USERS = 'users';
class userServices {
  unsubscribeUsers: any;
  // #region user profile
  get(id: string) {
    try {
      return getDoc(doc(db, USERS, id));
    } catch (error) {
      console.log('error', error);
    }
  }

  create(id: string, data: Record<string, any>) {
    try {
      const today = new Date();
      return setDoc(doc(db, USERS, id), {
        updatedAt: Timestamp.fromDate(today),
        createdAt: Timestamp.fromDate(today),
        ...data,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  snapshotUsers(callback: (arg0: any[]) => void) {
    const q = query(collection(db, 'users'));
    if (typeof this.unsubscribeUsers === 'function') {
      this.unsubscribeUsers();
    }
    this.unsubscribeUsers = onSnapshot(q, querySnapshot => {
      if (typeof callback === 'function') {
        callback(snapshotToArray(querySnapshot as any));
      }
    });
  }

  async getAllUsers() {
    try {
      const loadConfig = query(collection(db, 'users'));
      const querySnapshot = await getDocs(loadConfig);
      return snapshotToArray(querySnapshot as any);
    } catch (error) {
      console.log('getAllUsers ==> error: ', error);
    }
  }

  async getUserById(id: string) {
    try {
      const userRef = doc(db, USERS, id);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getUsersInfo(datas: any[]) {
    try {
      const infos = await Promise.all(
        datas.map(uid => {
          return this.getUserById(uid);
        }),
      );
      return infos;
    } catch (error) {
      console.log('getUsersInfo', error);
    }
  }

  update(id: string, data: Record<string, any>) {
    try {
      return setDoc(
        doc(db, USERS, id),
        {
          ...data,
          updatedAt: Timestamp.fromDate(new Date()),
        },
        {merge: true},
      );
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new userServices();
