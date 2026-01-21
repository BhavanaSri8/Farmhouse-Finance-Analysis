import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { IncomeDashboard } from './dashboard/income-dashboard/income-dashboard';
import { ExpenseDashboard } from './dashboard/expense-dashboard/expense-dashboard';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Login page (default)
  { path: 'login', component: LoginComponent },

  // Protected pages
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'income', component: IncomeDashboard, canActivate: [AuthGuard] },
  { path: 'expenses', component: ExpenseDashboard, canActivate: [AuthGuard] },

  // Default route → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Wildcard route
  { path: '**', redirectTo: 'login' }
];
