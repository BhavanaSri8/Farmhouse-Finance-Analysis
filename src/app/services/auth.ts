import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  private readonly user = {
    email: 'admin@farmhouse.com',
    password: 'admin123'
  };

  login(email: string, password: string): boolean {
    if (email === this.user.email && password === this.user.password) {
      this.isLoggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
