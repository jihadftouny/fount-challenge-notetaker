import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  forgotPassword() {
    if (this.email == '') {
      alert('Please enter an email');
      return;
    }
    this.authService.forgotPassword(this.email);
    this.email = '';
  }
}
