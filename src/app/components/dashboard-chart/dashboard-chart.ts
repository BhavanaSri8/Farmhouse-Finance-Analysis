import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard-chart.html',
  styleUrl: './dashboard-chart.css',
})
export class DashboardChartComponent implements OnChanges {
  @Input() chartType: 'pie' | 'doughnut' | 'bar' = 'pie';
  @Input() data: { [key: string]: number } = {};
  @Input() title: string = 'Chart';
  @Input() chartColor: 'green' | 'red' = 'green';

  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['chartColor']) {
      this.updateChart();
    }
  }

  updateChart(): void {
    const labels = Object.keys(this.data);
    const values = Object.values(this.data);

    const colors =
      this.chartColor === 'green'
        ? ['#27ae60', '#2ecc71', '#16a085', '#1abc9c', '#3498db']
        : ['#e74c3c', '#c0392b', '#e67e22', '#f39c12', '#d35400'];

    this.chartData = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    };
  }
}
