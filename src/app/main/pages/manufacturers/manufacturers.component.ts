import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ManufacturersService } from '../../../@core/services/manufacturers.service';
import { NewManufacturersModalComponent } from '../../modals/new-manufacturers-modal/new-manufacturers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit {
  // Public
  displayedColumns: string[] = ['name', 'email', 'defaultShipmentTerms', 'star'];
  public rows = [];
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
  public loading: boolean = false;
  public translateSnackBar: any;
  public selName: string = '';
  public selDepartment: string = '';
  public selPrevilege: string = '';

  public nameArr: Array<any> = [];
  public departmentArr: Array<any> = [];
  public priviligeArr: Array<any> = [];

  constructor(
    private manufacturerService: ManufacturersService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.pageChanged(1, 15);
    this.getFilters();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    console.log('TRANSLATE', this.translateSnackBar);
  }

  getRequest(count) {
    this.limit = count;
    this.manufacturerService
      .getManufacturers(this.offset, this.limit, this.selName)
      .subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.loading = false;
      });
  }

  getFilters() {
    this.loading = true;
    this.manufacturerService.getFilters().subscribe((data) => {
      this.nameArr = data;
      this.loading = false;
    });
  }

  pageChanged(page: number, count) {
    console.log('event', page);
    this.cPage = page;
    this.offset = 10 * (this.cPage - 1);
    this.leastDaysAgo = this.limit * this.cPage;
    this.itemsPerPage = count;
    this.getRequest(count);
  }

  modalManufacturer(row) {
    console.log("new/edit manufacturer");
    const modalRef = this.modalService.open(NewManufacturersModalComponent, {});
    modalRef.componentInstance.manufacturerItem = { 'data': row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest(10);
      }
    });
  }

  deleteManufacturer(row) {
    this.loading = true;
    this.manufacturerService.deleteManufacturers(row.id).subscribe(manufacturerService => {
      this.getRequest(10);
      this.toastrService.success(this.translateSnackBar.deleteMsg, '', {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
      });
      this.loading = false;
    },
      (error) => {
        this.toastrService.success(this.translateSnackBar.deleteMsg, '', {
          toastClass: 'toast ngx-toastr',
          closeButton: true,
        });
        this.loading = false;
        this.getRequest(10);
      }
    );
  }
}
