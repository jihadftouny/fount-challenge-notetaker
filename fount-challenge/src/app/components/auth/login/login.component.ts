import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AuthService } from '../../../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  login() {
    if (this.email === '') {
      this.openSnackBar('Please enter an email');
      return;
    }
    if (this.password === '') {
      this.openSnackBar('Please enter a password');
      return;
    }
    this.authService.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.authService.googleSignIn();
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }
}
