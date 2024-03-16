import {auth} from '../config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import UserServices from '../user/user.services';

class AuthServices {
  onAuthStateChanged(cb: any) {
    return onAuthStateChanged(auth, cb);
  }
  async register(email: string, password: string, options: {userName: any}) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const {userName} = options;
    const {uid} = res.user;
    UserServices.create(uid, {
      email,
      uid,
      userName,
    });
    return res;
  }

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  loginWithAnonymous() {
    return signInAnonymously(auth);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  async logout() {
    return signOut(auth);
  }
}

export default new AuthServices();
