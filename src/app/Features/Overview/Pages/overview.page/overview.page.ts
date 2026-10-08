import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../Interfaces/overview.interfaces';

@Component({
  imports: [
    TranslatePipe,
    CurrencyPipe,
    NgApexchartsModule,
  ],
  selector: 'app-overview-page',
  styleUrl: './overview.page.scss',
  templateUrl: './overview.page.html',
})
export class OverviewPage implements OnInit, AfterViewInit {
  private _PLATFORM_ID = inject(PLATFORM_ID)
  splineChart: Partial<ChartOptions> = {
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
  donutChart: Partial<ChartOptions> = {
          series: [44, 55, 41, 17, 15],
          chart: {
            type: 'donut',
            height: 380,
          },
          labels: ['Comedy', 'Action', 'SciFi', 'Drama', 'Horror'],
          plotOptions: {
            pie: {
              borderRadius: 10,
              spacing: 10,
              donut: {
                size: '62%',
              },
            },
          },
          stroke: {
            width: 0,
          },
          legend: {
            position: 'top',
            labels: {
              colors: '#f4f7f6',
            }
          },
        };
  selectedPeriod = signal(0)
  periodMessage = signal('Week');

  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }

  ngAfterViewInit(): void {

  }

}
