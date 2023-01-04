import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ManufacturersService } from '../../../@core/services/manufacturers.service';
import { NewManufacturersModalComponent } from '../../modals/new-manufacturers-modal/new-manufacturers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit {
  // Public
  displayedColumns: string[] = ['name', 'email', 'defaultShipmentTerms', 'star'];
  public rows = [];
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;
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
    this.pageChanged(1);
    this.getFilters();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    console.log('TRANSLATE', this.translateSnackBar);
  }

  getRequest() {
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

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }

  modalManufacturer(row) {
    console.log("new/edit manufacturer");
    const modalRef = this.modalService.open(NewManufacturersModalComponent, {});
    modalRef.componentInstance.manufacturerItem = { 'data': row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest();
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg ,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  }

  deleteManufacturer(row) {
    this.loading = true;
    this.manufacturerService.deleteManufacturers(row.id).subscribe(manufacturerService => {
      this.getRequest();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg ,
        showConfirmButton: false,
        timer: 2000
      })
      this.loading = false;
    },
      (error) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.deleteMsg ,
          showConfirmButton: false,
          timer: 2000
        })
        this.loading = false;
        this.getRequest();
      }
    );
  }
}
