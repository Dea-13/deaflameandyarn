import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseService } from '../../../@core/services/warehouse.service';

@Component({
  selector: 'app-free-address',
  templateUrl: './free-address.component.html',
  styleUrls: ['./free-address.component.scss'],
})
export class FreeAddressComponent implements OnInit {
  // Public
  public rows = [];
  public loadingIndicator = true;
  public reorderable = true;
  public columns = [{ name: '', prop: '' }];
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
    private warehouseService: WarehouseService,
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

  makeTable() {
    this.columns = [
      { name: this.translateSnackBar.resource, prop: 'name' },
      { name: this.translateSnackBar.place, prop: 'name' },
      { name: this.translateSnackBar.partOfGroup, prop: 'name' },
      { name: this.translateSnackBar.matrix, prop: 'name' },
      { name: this.translateSnackBar.diameter, prop: 'name' },
      { name: this.translateSnackBar.thickness, prop: 'name' },
      { name: this.translateSnackBar.size, prop: 'name' },
      { name: this.translateSnackBar.freeCapacity, prop: 'name' },
    ];
  }

  getRequest(count, searchValue) {
    this.limit = count;
    // this.warehouseService
    // .getFreeAddressWarehouse(this.offset, this.limit, searchValue)
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
