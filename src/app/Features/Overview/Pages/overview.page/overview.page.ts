import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../Interfaces/overview.interfaces';

@Component({
  imports: [
    RouterLink,
    NgApexchartsModule
  ],
  selector: 'app-overview-page',
  styleUrl: './overview.page.scss',
  templateUrl: './overview.page.html',
})
export class OverviewPage implements AfterViewInit {

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Solar',
        data: [42, 48, 51, 39, 55, 60, 58, 44, 50, 63, 66, 59, 52, 57],
      },
      {
        name: 'Wind',
        data: [28, 35, 22, 41, 33, 26, 38, 45, 31, 24, 36, 42, 29, 34],
      },
    ],
    chart: {
      height: 200,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2025-06-01',
        '2025-06-02',
        '2025-06-03',
        '2025-06-04',
        '2025-06-05',
        '2025-06-06',
        '2025-06-07',
        '2025-06-08',
        '2025-06-09',
        '2025-06-10',
        '2025-06-11',
        '2025-06-12',
        '2025-06-13',
        '2025-06-14',
      ],
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val + ' GWh'
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
  };

  ngAfterViewInit(): void {

  }

}
