import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { MatrixService } from '../../../@core/services/matrix.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-dispatched',
  templateUrl: './dispatched.component.html',
  styleUrls: ['./dispatched.component.scss']
})
export class DispatchedComponent implements OnInit {
// Public
public rows = [];
public loadingIndicator = true;
public reorderable = true;
public columns = [
  { name: '', prop: '' },
];
public ColumnMode = ColumnMode;
public searchValue = '';
public selectedOption = 10;
//for pagination
public cPage: number = 1;
public limit: number = 10;
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

constructor(
  private matrixService: MatrixService,
  public translate: TranslateService
) {}

ngOnInit(): void {
  this.loading = true;
  this.pageChanged(1, 15);
  this.translate.get('translate').subscribe((snackBar: string) => {
    this.translateSnackBar = snackBar;
  });
  this.makeTable();
  console.log('TRANSLATE', this.translateSnackBar);
}

makeTable(){
  this.columns = [
    { name: this.translateSnackBar.matrix, prop: "name" },
    { name: this.translateSnackBar.press, prop: "name" },
    { name: this.translateSnackBar.manufacturer, prop: "name" },
    { name: this.translateSnackBar.diameter, prop: "name" },
    { name: this.translateSnackBar.thickness, prop: "name" },

    { name: this.translateSnackBar.diameter, prop: "name" },//////
    { name: this.translateSnackBar.thickness, prop: "name" },/////

    { name: this.translateSnackBar.bolster1, prop: "name" },
    { name: this.translateSnackBar.bolster1, prop: "name" },
    { name: this.translateSnackBar.dieHolder, prop: "name" },
    { name: this.translateSnackBar.container, prop: "name" },
    { name: this.translateSnackBar.price, prop: "name" },

    { name: this.translateSnackBar.price, prop: "name" },////////

    { name: this.translateSnackBar.notes, prop: "name" },

    { name: this.translateSnackBar.customer, prop: "name" },/////

    { name: this.translateSnackBar.customer, prop: "name" },
    { name: this.translateSnackBar.orderDate, prop: "name" },
    { name: this.translateSnackBar.confirmationDate, prop: "name" },
    { name: this.translateSnackBar.dispatchedDate, prop: "name" },
  ];
}

getRequest(count, searchValue) {
  this.limit = count;
  // this.matrixService
    // .getDispatchedMatrix(this.offset, this.limit, searchValue)
    // .subscribe((data) => {
    //   this.rows = data.list;
    //   this.totalResult = data['total'];
      this.loading = false;
    // });
}

pageChanged(page: number, count) {
  console.log('event', page);
  this.cPage = page;
  this.offset = 10 * (this.cPage - 1);
  this.leastDaysAgo = this.limit * this.cPage;
  this.itemsPerPage = count;
  this.getRequest(count, '');
}

searchTable(count, searchMaterial) {
  this.loading = true;
  this.getRequest(count, searchMaterial);
}

clearTable(count, searchValue) {
  this.loading = true;
  searchValue = '';
  this.getRequest(count, '');
}
}
