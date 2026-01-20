import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { IncomeDashboard } from './dashboard/income-dashboard/income-dashboard';
import { ExpenseDashboard } from './dashboard/expense-dashboard/expense-dashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'income', component: IncomeDashboard },
  { path: 'expenses', component: ExpenseDashboard },
];
