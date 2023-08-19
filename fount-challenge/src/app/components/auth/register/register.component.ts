import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    if (this.email == '') {
      alert('Please enter an email');
      return;
    }
    if (this.password == '') {
      alert('Please enter a password');
      return;
    }
    this.authService.register(this.email, this.password);

    this.email = '';
    this.password = '';
  }
}
