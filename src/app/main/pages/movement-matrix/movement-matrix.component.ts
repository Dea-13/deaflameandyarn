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
  ApexStates,
  ChartComponent
} from 'ng-apexcharts';

export interface ChartOptions3 {
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

export type ChartOptionsWave = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

export type ChartOptionsInResource = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

export type ChartOptionsOutResource = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

export type ChartOptionsCircle = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-movement-matrix',
  templateUrl: './movement-matrix.component.html',
  styleUrls: ['./movement-matrix.component.scss']
})
export class MovementMatrixComponent implements OnInit {
  // Public
  // @ViewChild('apexRadialChartRef') apexRadialChartRef: any;
  @ViewChild("chartWave") chartWave: ChartComponent;
  @ViewChild("chartInResource") chartInResource: ChartComponent;
  @ViewChild("chartOutResource") chartOutResource: ChartComponent;
  @ViewChild("chartCircle") chart: ChartComponent;
  public ChartOptionsCircle: Partial<ChartOptionsCircle>;
  public ChartOptionsOutResource: Partial<ChartOptionsOutResource>;
  public ChartOptionsInResource: Partial<ChartOptionsInResource>;

  public ChartOptionsWave: Partial<ChartOptionsWave>;
  // public apexRadialChart: Partial<ChartOptions2>;
  displayedColumns: string[] = ['computerName', 'resourceInName', 'resourceOutName', 'count'];
  public urls = [
    { id: 0, name: 'computername' },
    { id: 1, name: 'resourcename' },
  ];
  public urlsFilter = [
    { id: 0, name: 'computerName' },
    { id: 1, name: 'resourceOutName' }
  ];
  public rows: Array<any> = [];
  public size = 13;
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
  public diagram: number;
  public diagramArr: Array<any> = []
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
  public showAll: boolean = false;
  public showWave: boolean = false;
  public showResorceIn: boolean = false;
  public showResorceOut: boolean = false;
  public totals: Array<any> = [];
  public arrayChartName: Array<any> = [];
  public arrayChartTotal: Array<any> = [];
  public showCircle: boolean = false;
  public monthTotal: Array<any> = [];

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.diagramArr = [
      { id: 0, name: this.translateSnackBar.all },
      { id: 4, name: this.translateSnackBar.monthCircle },
      { id: 1, name: this.translateSnackBar.totalByYear },
      { id: 2, name: this.translateSnackBar.totalByName },
      // { id: 3, name: this.translateSnackBar.resourceOut },
    ]
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
    this.ChartOptionsCircle = {
      series: [
        {
          name: "",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      xaxis: {
        categories: []
      }
    };

    this.ChartOptionsWave = {
      series: [
        {
          name: "",
          data: []
        }
      ],
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          }
        }
      },
      colors: ["#7367f0"],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      xaxis: {
        type: "datetime"
      }
    };

    this.ChartOptionsInResource = {
      series: [
        {
          name: "basic",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ["#E0B0FF"],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []
      }
    };

    this.ChartOptionsOutResource = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    };
  }

  ngOnInit(): void {
    this.getRequest();
    this.getTotals();
    this.getFilters(2);
  }

  showDiagram() {
    console.log('showDiagram', this.diagram)
    if (this.diagram == null) { this.showAll = false; }
    if (this.diagram == 0) { this.showAll = true; } else { this.showAll = false; }
    if (this.diagram == 1) { this.showWave = true; } else { this.showWave = false; }
    if (this.diagram == 2) { this.showResorceIn = true; } else { this.showResorceIn = false; }
    if (this.diagram == 3) { this.showResorceOut = true; } else { this.showResorceOut = false; }
    if (this.diagram == 4) { this.showCircle = true; } else { this.showCircle = false; }
  }

  getRequest() {
    this.loading = true;
    this.getChartCircle();
    this.matrixService.getDieMovement(this.computerName, this.resourceInName, this.resourceOutName, this.year, this.month).subscribe((data) => {
      var rows = this.uniqueData(data, 'computerName');
      for (let i = 0; i < rows.length; i++) {
        rows[i] = this.uniqueLineNo(rows[i].computerName, data);
      }
      this.rows = rows;
      this.loading = false;
      this.getChartResourceIn();
      console.log("this.rows", this.rows)
    });
  }

  uniqueLineNo(filteredName, data) {
    let sortArr;
    let name = [];
    let resourceInName = [];
    let resourceOutName = [];
    let count = [];
    let total = 0;
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
        total += data[i].count;
      }
    }
    sortArr = {
      name: name[0],
      resourceInName: resourceInName,
      resourceOutName: resourceOutName,
      count: count,
      total: total
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

  getFilters(ind) {    
    this.loading = true;
    let count = 0; 
    
    for (let i = 0; i < this.urlsFilter.length; i++) {
      if(ind != this.urlsFilter[i].id){
        this.matrixService.getFilters(this.urls[i].name, this.computerName, this.resourceInName, this.resourceOutName, this.year, this.month).subscribe((data) => {          
          if(ind != this.urlsFilter[i].id){
            switch (this.urlsFilter[i].id) {
              case 0: { this.computerNameArr = data; } break;
              case 1: { this.resourceInArr = data; this.resourceOutArr = data; } break;
            }
          }
          count++;          
        });
      }
    }
    this.getRequest();    
    if(count == 2){
      this.loading = false;
    }
  }

  // ************************************************************************CHARTS WAVE*****************************************************************

  getTotals() {
    let sumCount = 0;
    let totals = [];
    for (let i = 0; i < this.yearArr.length; i++) {
      this.matrixService.getDieMovement('', '', '', this.yearArr[i].year, '').subscribe((data) => {
        for (let j = 0; j < data.length; j++) {
          sumCount += data[j].count
        }
        console.log("totals sumCount", sumCount)
        this.totals.push(sumCount);
      });
    }
    setTimeout(() => {
      console.log("totals", this.totals)
      this.getChartWave();
    }, 4000);
  }

  getChartWave() {
    this.ChartOptionsWave = {
      series: [
        {
          name: this.translateSnackBar.total,
          data: this.generateDayWiseTimeSeries()
        }
      ],
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          }
        }
      },
      colors: ["#7367f0"],
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

  generateDayWiseTimeSeries() {
    let yearArr = [{ year: 2018 }, { year: 2019 }, { year: 2020 }, { year: 2021 }, { year: 2022 }, { year: 2023 }, { year: 2024 }];
    var series = [];

    for (let i = 0; i < yearArr.length; i++) {
      for (let j = 0; j < this.totals.length; j++) {
        if (i == j) {
          series.push([new Date('01 Jan' + yearArr[i].year).getTime(), this.totals[j]]);
        }
      }
    }
    console.log('generateDayWiseTimeSeries', series)
    return series;
  };

  // ************************************************************************CHARTS TOTAL COMPUTER NAME*****************************************************************

  getChartResourceIn() {
    for (let i = 0; i < this.rows.length; i++) {
      this.arrayChartName.push(this.rows[i].name == null ? '' : this.rows[i].name);
      this.arrayChartTotal.push(this.rows[i].total);
    }
    console.log('getChartResourceIn', this.arrayChartName, this.arrayChartTotal)
    this.ChartOptionsInResource = {
      series: [
        {
          name: "",
          data: this.arrayChartTotal
        }
      ],
      chart: {
        type: "bar",
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ["#CBC3E3"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#7367f0"]
        }
      },
      xaxis: {
        categories: this.arrayChartName
      }
    };
  }

  // ************************************************************************CHARTS CIRCLE*****************************************************************

  getChartCircle() {
    this.monthTotal = [];
    this.matrixService.getChartYear(this.year).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.monthTotal.push(data[i].total);
      }
    });
    console.log('getChartCircle', this.monthTotal);

    this.ChartOptionsCircle = {
      series: [
        {
          name: "",
          data: this.monthTotal
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
      dataLabels: {
        enabled: true
      },
      fill: {
        type: 'gradient'
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        categories: [
          this.translateSnackBar.january,
          this.translateSnackBar.february,
          this.translateSnackBar.march,
          this.translateSnackBar.april,
          this.translateSnackBar.may,
          this.translateSnackBar.june,
          this.translateSnackBar.july,
          this.translateSnackBar.august,
          this.translateSnackBar.september,
          this.translateSnackBar.octomber,
          this.translateSnackBar.november,
          this.translateSnackBar.december,
        ]
      }
    };
  }

  clarAll() {
    this.computerName = ''; 
    this.resourceInName = '';
    this.resourceOutName = '';
    this.getRequest();
    this.getFilters(2);
  }
}
