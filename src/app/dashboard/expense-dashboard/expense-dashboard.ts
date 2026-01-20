import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Finance } from '../../services/finance';
import { Transaction, PropertyName } from '../../models/transaction.model';
import { AddTransactionComponent } from '../../components/add-transaction/add-transaction';
import { DashboardChartComponent } from '../../components/dashboard-chart/dashboard-chart';
import { FinancialAnalysisComponent } from '../../components/financial-analysis/financial-analysis';

@Component({
  selector: 'app-expense-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTransactionComponent, DashboardChartComponent, FinancialAnalysisComponent],
  templateUrl: './expense-dashboard.html',
  styleUrl: './expense-dashboard.css',
})
export class ExpenseDashboard implements OnInit {
  Object = Object;
  selectedProperty: PropertyName = 'Earthy Escape';
  expenseTransactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  totalExpense: number = 0;
  transactionsByCategory: { [key: string]: number } = {};

  properties: PropertyName[] = ['Earthy Escape', 'Millennium Farm House'];

  constructor(private financeService: Finance) {}

  ngOnInit(): void {
    this.loadExpenseData();
    this.financeService.getSelectedProperty().subscribe((property) => {
      this.selectedProperty = property;
      this.loadExpenseData();
    });
  }

  loadExpenseData(): void {
    this.financeService.getExpenseTransactions(this.selectedProperty).subscribe((transactions) => {
      this.expenseTransactions = transactions;
      this.totalExpense = transactions.reduce((sum, t) => sum + t.amount, 0);

      // Group by category
      this.transactionsByCategory = {};
      transactions.forEach((t) => {
        this.transactionsByCategory[t.category] =
          (this.transactionsByCategory[t.category] || 0) + t.amount;
      });
    });

    // Load all transactions for analysis
    this.financeService.getAllTransactions().subscribe((transactions) => {
      this.allTransactions = transactions.filter((t) => t.property === this.selectedProperty);
    });
  }

  selectProperty(property: PropertyName): void {
    this.financeService.setSelectedProperty(property);
  }

  onTransactionAdded(transaction: Omit<Transaction, 'id'>): void {
    this.financeService.addTransaction(transaction).subscribe(() => {
      this.loadExpenseData();
      alert('Transaction added successfully!');
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  downloadReport(): void {
    const csvHeaders = ['Date', 'Description', 'Category', 'Amount'];
    const csvRows = this.expenseTransactions.map((t) => [
      t.date,
      t.description,
      t.category,
      `$${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    ]);

    const summaryRows = [
      ['EXPENSE REPORT - ' + this.selectedProperty],
      ['Generated: ' + new Date().toLocaleDateString()],
      [],
      ['SUMMARY'],
      ['Total Expenses', `$${this.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`],
      ['Total Transactions', this.expenseTransactions.length.toString()],
      [],
      ['BREAKDOWN BY CATEGORY'],
      ...Object.entries(this.transactionsByCategory).map(([cat, amount]) => [
        cat,
        `$${(amount as number).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      ]),
      [],
      ['TRANSACTIONS'],
      csvHeaders,
      ...csvRows,
    ];

    const csvContent = summaryRows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `expense-report-${this.selectedProperty.replace(' ', '-')}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
