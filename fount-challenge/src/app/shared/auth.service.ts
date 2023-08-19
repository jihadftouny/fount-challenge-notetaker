import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async getCurrentUserId(): Promise<string> {
    const user = await this.fireauth.currentUser;
    return user ? user.uid : '';
  }

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
        this.openSnackBar('Error on Login');
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.openSnackBar('Registration Successfull!');
        console.log(res.user);
        this.sendEmailForVerification(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.openSnackBar(err.message);
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
        this.openSnackBar(err.message);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify']);
      },
      (err) => {
        this.openSnackBar('Something went wrong');
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
        this.openSnackBar(
          'Something went wrong. Not able to send mail to your email.'
        );
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
          this.openSnackBar(err.message);
        }
      );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }
}
