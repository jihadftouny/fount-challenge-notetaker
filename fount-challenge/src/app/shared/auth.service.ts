import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  async getCurrentUserId(): Promise<string> {
    const user = await this.fireauth.currentUser;
    return user ? user.uid : '';
  }

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified == true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/verify']);
        }
      },
      (err) => {
        alert('Error on Login');
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successfull!');
        console.log(res.user);
        this.sendEmailForVerification(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        this.router.navigate(['']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  sendEmailForVerification(user: any) {
    console.log(user);
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify']);
      },
      (err: any) => {
        alert('Something went wrong. Not able to send mail to your email.');
      }
    );
  }

  googleSignIn() {
    return this.fireauth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (res) => {
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          alert(err.message);
        }
      );
  }

  // getAuthServiceInstance() {
  //   return this;
  // }
}
