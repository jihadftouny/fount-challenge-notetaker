import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
MatSnackBar;
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  register() {
    if (this.email === '') {
      this.openSnackBar('Please enter an email');
      return;
    }
    if (this.password === '') {
      this.openSnackBar('Please enter a password');
      return;
    }
    this.authService.register(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }
}
