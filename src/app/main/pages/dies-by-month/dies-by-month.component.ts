import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatrixService } from '../../../@core/services/matrix.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dies-by-month',
  templateUrl: './dies-by-month.component.html',
  styleUrls: ['./dies-by-month.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiesByMonthComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  public columnsToDisplay = ['name'];
  public columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  public expandedElement: null;
  public displayedColumns: string[] = ['dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName', 'countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction', 'gr', 'inUseFrom'];
  public size = 13;
  public rows = [{}];
  public languageOptions: any;
  public translateSnackBar: any;
  public statusId: number = 40;
  public tempData: any = [];
  public keyword: string = '';
  public count: number = 0;
  public arrDataMonths: any;

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  ngOnInit(): void {
    this.blockUI.start('Loading...');
    this.getDataByMonth();
  }

  getDataByMonth() {
    this.blockUI.start('Loading...');
    this.matrixService.getDataByMonth().subscribe((data) => {
      this.arrDataMonths = data;
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
    });
  }

  toggleExpandRow(row, expanded) {
    console.log('Toggled Expand Row!', row, expanded);
    if (expanded !== null) {
      this.getRequest(row);
    }
  }

  getRequest(row) {
    this.blockUI.start('Loading...');
    this.matrixService.subTableByMonth(row.startTime, row.endTime).subscribe((data) => {
      this.rows = data;
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
    });
  }

}
