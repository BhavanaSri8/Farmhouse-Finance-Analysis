import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction.model';

interface AnalysisData {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
  avgTransaction: number;
  topCategory: { name: string; amount: number };
  transactionCount: number;
}

@Component({
  selector: 'app-financial-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-analysis.html',
  styleUrl: './financial-analysis.css',
})
export class FinancialAnalysisComponent {
  @Input() transactions: Transaction[] = [];
  @Input() analysisType: 'income' | 'expense' = 'income';

  get analysis(): AnalysisData {
    const filtered = this.transactions.filter((t) => t.type === this.analysisType);

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

    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0] || [
      'N/A',
      0,
    ];

    return {
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
      profitMargin: totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0,
      avgTransaction: filtered.length > 0 ? filtered.reduce((sum, t) => sum + t.amount, 0) / filtered.length : 0,
      topCategory: { name: topCategory[0], amount: topCategory[1] },
      transactionCount: filtered.length,
    };
  }

  getStatusClass(value: number): string {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral';
  }
}
