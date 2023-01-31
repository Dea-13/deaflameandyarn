import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
import { MatrixService } from '../../../@core/services/matrix.service';

@Component({
  selector: 'app-movement-matrix',
  templateUrl: './movement-matrix.component.html',
  styleUrls: ['./movement-matrix.component.scss']
})
export class MovementMatrixComponent implements OnInit {
  // Public
  @ViewChild('apexRadialChartRef') apexRadialChartRef: any;
  public apexRadialChart: Partial<ChartOptions2>;
  displayedColumns: string[] = ['computerName', 'resourceInName', 'resourceOutName', 'count'];
  public urls = [
    { id: 0, name: 'DieMovement/all/computername' },
    { id: 1, name: 'Resource/all/resourcename' },
  ];
  public rows: Array<any> = [];
  //for pagination
  public languageOptions: any;
  public loading: boolean = false;
  public translateSnackBar: any;
  public computerNameArr: Array<any> = [];
  public resourceInArr: Array<any> = [];
  public resourceOutArr: Array<any> = [];
  public computerName: string = '';
  public resourceOutName: string = '';
  public resourceInName: string = '';
  public year: string = '2023';
  public month: string = '';
  public yearArr: Array<any> = [
    { year: 2018 },
    { year: 2019 },
    { year: 2020 },
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
  ]
  public monthArr: Array<any> = []
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
    private matrixService: MatrixService,
    public translate: TranslateService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.monthArr = [
      { id: 1, month: this.translateSnackBar.january },
      { id: 2, month: this.translateSnackBar.february },
      { id: 3, month: this.translateSnackBar.march },
      { id: 4, month: this.translateSnackBar.april },
      { id: 5, month: this.translateSnackBar.may },
      { id: 6, month: this.translateSnackBar.june },
      { id: 7, month: this.translateSnackBar.july },
      { id: 8, month: this.translateSnackBar.august },
      { id: 9, month: this.translateSnackBar.september },
      { id: 10, month: this.translateSnackBar.octomber },
      { id: 11, month: this.translateSnackBar.november },
      { id: 12, month: this.translateSnackBar.december },
    ]
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
    this.getRequest();
    this.getFilters();
  }

  getRequest() {
    this.loading = true;
    this.matrixService.getDieMovement(this.computerName, this.resourceInName, this.resourceOutName, this.year, this.month).subscribe((data) => {
      var rows = this.uniqueData(data, 'computerName');
      for (let i = 0; i < rows.length; i++) {
        var array = this.uniqueLineNo(rows[i].computerName, data);
        rows[i].array = array;
      }
      this.rows = rows;
      this.loading = false;
      console.log("this.rows", this.rows)
    });
  }

  uniqueLineNo(filteredName, data) {
    let sortArr;
    let name = [];
    let resourceInName = [];
    let resourceOutName = [];
    let count = [];
    for (let i = 0; i < data.length; i++) {
      if (filteredName === data[i].computerName) {
        name.push(filteredName);
        data = data.sort((a1, a2) => {
          if (a1.computerName > a2.computerName) {
            return 1;
          }
          if (a1.computerName < a2.computerName) {
            return -1;
          }
          return 0;
        });
        resourceInName.push(data[i].resourceInName);
        resourceOutName.push(data[i].resourceOutName);
        count.push(data[i].count);
      }
    }
    sortArr = {
      name: name[0],
      resourceInName: resourceInName,
      resourceOutName: resourceOutName,
      count: count,
    }
    return sortArr;
  }

  uniqueData(array, key) {
    var uniqueArray = [];
    var map = new Map();

    array.forEach((user, index) => {
      if (!map.get(user[key])) {
        console.log("user[key]", map.set(user[key], user[key])); // do not delete!!!
        uniqueArray.push(user);
      }
    });
    return uniqueArray;
  }

  getFilters() {
    this.loading = true;
    for (let i = 0; i < this.urls.length; i++) {
      this.matrixService.getFilters(this.urls[i].name).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0: { this.computerNameArr = data; } break;
          case 1: { this.resourceInArr = data; this.resourceOutArr = data; } break;
        }
        this.loading = false;
      });
    }
  }

}
