import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // ✅ REQUIRED for *ngIf, *ngFor
    FormsModule   // ✅ REQUIRED for ngModel
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const success = this.authService.login(this.email, this.password);

    if (success) {
      console.log('Login successful');
      this.router.navigateByUrl('/home'); // go to Home
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
