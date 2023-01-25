import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { userInfo } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private router: Router) {}

  registerUser({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  datosUsuario(): userInfo {
    const auth = getAuth();
    const user = auth.currentUser;
    const userInfo = {
      displayName: user!.displayName,
      email: user!.email,
      photoURL: user!.photoURL,
    };
    return userInfo;
  }
}
