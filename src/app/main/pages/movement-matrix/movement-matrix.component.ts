import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseService } from '../../../@core/services/warehouse.service';
import Swal from 'sweetalert2';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates
} from 'ng-apexcharts';

export interface ChartOptions2 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}
import { colors } from '../../../colors.const';

@Component({
  selector: 'app-movement-matrix',
  templateUrl: './movement-matrix.component.html',
  styleUrls: ['./movement-matrix.component.scss']
})
export class MovementMatrixComponent implements OnInit {
  // Public
  @ViewChild('apexRadialChartRef') apexRadialChartRef: any;
  public apexRadialChart: Partial<ChartOptions2>;
  displayedColumns: string[] = ['username', 'resourceIn', 'resourceOut', '2018', '2019', '2020', '2021', '2022', 'total'];
  public urls = [
    { id: 0, name: 'resourcename' },
    { id: 1, name: 'storageplace' },
  ];
  public rows = [];
  public searchValue = '';
  public selectedOption = 10;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public leastDaysAgo = this.limit * this.cPage;
  public totalResult: number = 0;
  public maxSize = 10;
  public itemsPerPage = 15;
  public countRows: number = 15;
  public languageOptions: any;
  public searchMaterial: any = '';
  public loading: boolean = false;
  public translateSnackBar: any;
  public resourceName: Array<any> = [];
  public storagePlace: Array<any> = [];
  public status: number;
  public resourceNameArr: string = '';
  public storagePlaceArr: string = '';
  // Color Variables
  chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#ffe700',
      series2: '#00d4bd',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1'
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };

  constructor(
    private warehouseService: WarehouseService,
    public translate: TranslateService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    console.log('TRANSLATE', this.translateSnackBar);
    // Apex Radial Chart
    this.apexRadialChart = {
      series: [80, 50, 35],
      labels: [this.translateSnackBar.username, this.translateSnackBar.resourceIn, this.translateSnackBar.resourceOut],
      chart: {
        height: 400,
        type: 'radialBar'
      },
      colors: [this.chartColors.donut.series1, this.chartColors.donut.series2, this.chartColors.donut.series4],
      plotOptions: {
        radialBar: {
          // size: 185,
          hollow: {
            size: '25%'
          },
          track: {
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat'
            },
            total: {
              show: true,
              fontSize: '1rem',
              label: this.translateSnackBar.total,
              formatter: function (w) {
                return '80%';
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }

  ngOnInit(): void {
    //  this.pageChanged(1);
    //  this.getFilters();
  }

  getRequest() {
    this.loading = true;
    this.warehouseService.getInformationWarehouse(this.offset, this.limit, this.resourceName, this.storagePlace, this.status).subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.loading = false;
      });
  }

  getFilters() {
    this.loading = true;
    for (let i = 0; i < this.urls.length; i++) {
      this.warehouseService.getFilters(this.urls[i].name).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0: { this.resourceNameArr = data; } break;
          case 1: { this.storagePlaceArr = data; } break;
        }
        this.loading = false;
      });
    }
  }

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }

}
