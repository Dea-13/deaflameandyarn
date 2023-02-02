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
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

export type ChartOptionsOutResource = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
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
  public ChartOptionsOutResource: Partial<ChartOptionsOutResource>;
  public ChartOptionsInResource: Partial<ChartOptionsInResource>;

  public ChartOptionsWave: Partial<ChartOptionsWave>;
  // public apexRadialChart: Partial<ChartOptions2>;
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

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.diagramArr = [
      { id: 0, name: this.translateSnackBar.all },
      { id: 1, name: this.translateSnackBar.resourceIn },
      { id: 2, name: this.translateSnackBar.resourceOut },
      { id: 3, name: this.translateSnackBar.totalByYear },
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
    // this.apexRadialChart = {
    //   series: [80, 50, 35],
    //   labels: [this.translateSnackBar.username, this.translateSnackBar.resourceIn, this.translateSnackBar.resourceOut],
    //   chart: {
    //     height: 400,
    //     type: 'radialBar'
    //   },
    //   colors: [this.chartColors.donut.series1, this.chartColors.donut.series2, this.chartColors.donut.series4],
    //   plotOptions: {
    //     radialBar: {
    //       // size: 185,
    //       hollow: {
    //         size: '25%'
    //       },
    //       track: {
    //         margin: 15
    //       },
    //       dataLabels: {
    //         name: {
    //           fontSize: '2rem',
    //           fontFamily: 'Montserrat'
    //         },
    //         value: {
    //           fontSize: '1rem',
    //           fontFamily: 'Montserrat'
    //         },
    //         total: {
    //           show: true,
    //           fontSize: '1rem',
    //           label: this.translateSnackBar.total,
    //           formatter: function (w) {
    //             return '80%';
    //           }
    //         }
    //       }
    //     }
    //   },
    //   legend: {
    //     show: true,
    //     position: 'bottom'
    //   },
    //   stroke: {
    //     lineCap: 'round'
    //   }
    // };
    this.ChartOptionsWave = {
      series: [
        {
          name: "South",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        },
        {
          name: "North",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            {
              min: 10,
              max: 20
            }
          )
        },
        {
          name: "Central",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            {
              min: 10,
              max: 15
            }
          )
        }
      ],
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function(chart, e) {
            console.log(new Date(e.xaxis.min));
          }
        }
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],
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
    this.getFilters();
  }

  showDiagram(){
    if(this.diagram == null){ this.showAll = false;}
    if(this.diagram == 0){ this.showAll = true;} else { this.showAll = false;}
    if(this.diagram == 1){ this.showWave = true;} else { this.showWave = false;}
    if(this.diagram == 2){ this.showResorceIn = true;} else { this.showResorceIn = false;}
    if(this.diagram == 3){ this.showResorceOut = true;} else { this.showResorceOut = false;}
  }

  generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  };

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
