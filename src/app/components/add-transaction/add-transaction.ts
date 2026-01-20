import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction, PropertyName } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css',
})
export class AddTransactionComponent {
  @Input() transactionType: 'income' | 'expense' = 'income';
  @Input() properties: PropertyName[] = [];
  @Output() transactionAdded = new EventEmitter<Omit<Transaction, 'id'>>();

  showForm = false;
  newTransaction: Partial<Omit<Transaction, 'id'>> = {
    type: this.transactionType,
    property: 'Earthy Escape',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: '',
  };

  categories: { [key: string]: string[] } = {
    income: ['Bookings', 'Events', 'Other'],
    expense: ['Staff', 'Maintenance', 'Utilities', 'Supplies', 'Other'],
  };

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newTransaction = {
      type: this.transactionType,
      property: 'Earthy Escape',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: '',
    };
  }

  submitForm(): void {
    if (
      !this.newTransaction.description ||
      !this.newTransaction.amount ||
      !this.newTransaction.category ||
      !this.newTransaction.date
    ) {
      alert('Please fill in all fields');
      return;
    }

    this.transactionAdded.emit(this.newTransaction as Omit<Transaction, 'id'>);
    this.resetForm();
    this.showForm = false;
  }
}
