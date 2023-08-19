import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  forgotPassword() {
    if (this.email === '') {
      this.snackBar.open('Please enter an email', 'Dismiss', {
        duration: 3000,
      });
      return;
    }
    this.authService.forgotPassword(this.email);
    this.email = '';
  }
}
