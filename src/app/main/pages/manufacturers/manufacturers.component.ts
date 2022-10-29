import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { ManufacturersService } from '../../../@core/services/manufacturers.service';
import { NewManufacturersModalComponent } from '../../modals/new-manufacturers-modal/new-manufacturers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit {
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
    private manufacturersService: ManufacturersService,
    public translate: TranslateService,
    private modalService: NgbModal,
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
      { name: this.translateSnackBar.name, prop: 'name' },
      { name: this.translateSnackBar.email, prop: 'name' },
      { name: this.translateSnackBar.defaultShipmentTerms, prop: 'name' },
    ];
  }

  getRequest(count, searchValue) {
    this.limit = count;
    // this.manufacturersService
    // .getManufacturers(this.offset, this.limit, searchValue)
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

  modalManufacturer(row) {
    console.log("new/edit manufacturer");
    const modalRef = this.modalService.open(NewManufacturersModalComponent, {});
    modalRef.componentInstance.manufacturerItem = { 'data': row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest(10, '');
      }
    });
  }
}
