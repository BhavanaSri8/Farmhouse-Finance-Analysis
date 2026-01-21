import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Finance } from '../../services/finance';

interface FarmhouseComparison {
  name: string;
  totalIncome: number;
  totalExpense: number;
  netIncome: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  successMessage: string = '';
  
  farmhouseComparison: FarmhouseComparison[] = [];
  totalAllIncome: number = 0;
  totalAllExpenses: number = 0;
  totalNetIncome: number = 0;

  incomeCategories = ['Bookings', 'Events', 'Services', 'Consultations', 'Merchandise', 'Catering', 'Tours', 'Rentals', 'Workshops', 'Classes'];
  expenseCategories = ['Staff', 'Utilities', 'Maintenance', 'Supplies', 'Equipment', 'Repairs', 'Insurance', 'Cleaning', 'Marketing', 'Transportation', 'Permits'];

  quickIncome = {
    property: 'Earthy Escape',
    amount: 0,
    description: '',
    category: 'Bookings',
    type: 'income'
  };

  quickExpense = {
    property: 'Earthy Escape',
    amount: 0,
    description: '',
    category: 'Maintenance',
    type: 'expense'
  };

  constructor(private financeService: Finance) {}

  ngOnInit(): void {
    this.loadFarmhouseComparison();
  }

  loadFarmhouseComparison(): void {
    this.financeService.getAllTransactions().subscribe((transactions) => {
      const farmhouses = ['Earthy Escape', 'Millennium Farm House'];
      this.farmhouseComparison = [];
      this.totalAllIncome = 0;
      this.totalAllExpenses = 0;

      farmhouses.forEach((farmhouse) => {
        const farmhouseTransactions = transactions.filter((t) => t.property === farmhouse);
        const income = farmhouseTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = farmhouseTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        const netIncome = income - expense;

        this.farmhouseComparison.push({
          name: farmhouse,
          totalIncome: income,
          totalExpense: expense,
          netIncome: netIncome
        });

        this.totalAllIncome += income;
        this.totalAllExpenses += expense;
      });

      this.totalNetIncome = this.totalAllIncome - this.totalAllExpenses;
    });
  }

  addQuickIncome(): void {
    if (!this.quickIncome.property || !this.quickIncome.amount || !this.quickIncome.description) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      property: this.quickIncome.property as 'Earthy Escape' | 'Millennium Farm House',
      amount: this.quickIncome.amount,
      description: this.quickIncome.description,
      category: this.quickIncome.category,
      type: 'income' as const
    };

    this.financeService.addTransaction(transaction).subscribe(() => {
      this.successMessage = `✅ Income of $${this.quickIncome.amount} added successfully!`;
      this.quickIncome = { property: 'Earthy Escape', amount: 0, description: '', category: 'Bookings', type: 'income' };
      setTimeout(() => this.successMessage = '', 3000);
    });
  }

  addQuickExpense(): void {
    if (!this.quickExpense.property || !this.quickExpense.amount || !this.quickExpense.description) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      property: this.quickExpense.property as 'Earthy Escape' | 'Millennium Farm House',
      amount: this.quickExpense.amount,
      description: this.quickExpense.description,
      category: this.quickExpense.category,
      type: 'expense' as const
    };

    this.financeService.addTransaction(transaction).subscribe(() => {
      this.successMessage = `✅ Expense of $${this.quickExpense.amount} added successfully!`;
      this.quickExpense = { property: 'Earthy Escape', amount: 0, description: '', category: 'Maintenance', type: 'expense' };
      setTimeout(() => this.successMessage = '', 3000);
    });
  }

  scrollToForm(): void {
    const formElement = document.querySelector('.quick-form-grid');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
}
