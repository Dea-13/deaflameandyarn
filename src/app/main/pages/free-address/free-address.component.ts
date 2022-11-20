import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseService } from '../../../@core/services/warehouse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseListDieModalComponent } from '../../modals/warehouse-list-die-modal/warehouse-list-die-modal.component';

@Component({
  selector: 'app-free-address',
  templateUrl: './free-address.component.html',
  styleUrls: ['./free-address.component.scss'],
})
export class FreeAddressComponent implements OnInit {
  // Public
  displayedColumns: string[] = [];
  public urls = [
    { id: 0, name: 'resourcename' },
    { id: 1, name: 'storageplace' },
  ];
  public rows = [];
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
  public resourceName: Array<any> = [];
  public storagePlace: Array<any> = [];
  public status: number;
  public resourceNameArr: string = '';
  public storagePlaceArr: string = '';

  constructor(
    private warehouseService: WarehouseService,
    public translate: TranslateService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.router.url == '/api/occupied-matrices' ? this.status = 1 : this.status = 0;
    if(this.status == 0){
      this.displayedColumns = ['resourceName', 'storagePlace', 'partOfGroup', 'diameter', 'thickness', 'size', 'freeCapacity'];
    } else {
      this.displayedColumns = ['resourceName', 'storagePlace', 'partOfGroup', 'matrix', 'diameter', 'countMatrix', 'capacity'];
    }
   }

  ngOnInit(): void {
    this.loading = true;

    this.pageChanged(1, 15);
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.getFilters();
    console.log('TRANSLATE', this.translateSnackBar);
  }

  getRequest(count) {
    this.limit = count;
    this.warehouseService
      .getInformationWarehouse(this.offset, this.limit, this.resourceName, this.storagePlace, this.status)
      .subscribe((data) => {
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
          case 0:
            {
              this.resourceNameArr = data;
            }
            break;
          case 1:
            {
              this.storagePlaceArr = data;
            }
            break;
        }
        this.loading = false;
      });
    }
  }

  pageChanged(page: number, count) {
    console.log('event', page);
    this.cPage = page;
    this.offset = 10 * (this.cPage - 1);
    this.leastDaysAgo = this.limit * this.cPage;
    this.itemsPerPage = count;
    this.getRequest(count);
  }

  viewDiesList(list){
    const modalRef = this.modalService.open(WarehouseListDieModalComponent, {});
    modalRef.componentInstance.dieItem = { 'list': list };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {}
    });
  }
}
