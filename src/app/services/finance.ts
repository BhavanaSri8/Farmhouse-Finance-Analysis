import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction, DashboardSummary, PropertyName } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class Finance {
  private apiUrl = 'http://localhost:3000/transactions';
  private selectedProperty$ = new BehaviorSubject<PropertyName>('Earthy Escape');

  constructor(private http: HttpClient) {}

  // Get all transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  // Get transactions by property
  getTransactionsByProperty(property: PropertyName): Observable<Transaction[]> {
    return this.getAllTransactions().pipe(
      map((transactions) => transactions.filter((t) => t.property === property))
    );
  }

  // Get income transactions
  getIncomeTransactions(property?: PropertyName): Observable<Transaction[]> {
    return this.getAllTransactions().pipe(
      map((transactions) =>
        transactions.filter((t) => {
          const matchesType = t.type === 'income';
          const matchesProperty = property ? t.property === property : true;
          return matchesType && matchesProperty;
        })
      )
    );
  }

  // Get expense transactions
  getExpenseTransactions(property?: PropertyName): Observable<Transaction[]> {
    return this.getAllTransactions().pipe(
      map((transactions) =>
        transactions.filter((t) => {
          const matchesType = t.type === 'expense';
          const matchesProperty = property ? t.property === property : true;
          return matchesType && matchesProperty;
        })
      )
    );
  }

  // Calculate summary for property
  getSummary(property: PropertyName, type?: 'income' | 'expense'): Observable<DashboardSummary> {
    return this.getTransactionsByProperty(property).pipe(
      map((transactions) => {
        const filtered = type ? transactions.filter((t) => t.type === type) : transactions;

        const totalIncome = filtered
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = filtered
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        const byCategory: { [key: string]: number } = {};
        filtered.forEach((t) => {
          byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
        });

        return {
          totalIncome,
          totalExpense,
          netBalance: totalIncome - totalExpense,
          transactionCount: filtered.length,
          byCategory,
        };
      })
    );
  }

  // Set selected property
  setSelectedProperty(property: PropertyName): void {
    this.selectedProperty$.next(property);
  }

  // Get selected property as observable
  getSelectedProperty(): Observable<PropertyName> {
    return this.selectedProperty$.asObservable();
  }

  // Get current selected property value
  getCurrentProperty(): PropertyName {
    return this.selectedProperty$.value;
  }

  // Add new transaction
  addTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  // Update transaction
  updateTransaction(id: number, transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  // Delete transaction
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
