import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesService } from '../../../@core/services/employees.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEmployeesModalComponent } from '../../modals/new-employees-modal/new-employees-modal.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = ['name', 'department', 'privilege', 'star'];
  public urls = [
    { id: 0, name: 'name' },
    { id: 1, name: 'department' },
    { id: 2, name: 'privilege' }
  ];
  public rows = [];
  public size = 13;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;
  public languageOptions: any;
  public searchMaterial: any = '';
  public translateSnackBar: any;
  public selName: string = '';
  public selDepartment: string = '';
  public selPrevilege: string = '';

  public nameArr: Array<any> = [];
  public departmentArr: Array<any> = [];
  public priviligeArr: Array<any> = [];

  constructor(
    private employeesService: EmployeesService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.pageChanged(1);
    this.getFilters();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    console.log('TRANSLATE', this.translateSnackBar);
  }

  getRequest() {
    this.blockUI.start('Loading...');
    this.employeesService.getEmployees(this.offset, this.limit, this.selName, this.selDepartment, this.selPrevilege)
    .subscribe((data) => {
      this.rows = data.list;
      this.totalResult = data.total;
      this.blockUI.stop();
    });
  }

  getFilters() {
    this.blockUI.start('Loading...');
    for (let i = 0; i < this.urls.length; i++) {
      this.employeesService.getFilters(this.urls[i].name).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0: { this.nameArr = data; } break;
          case 1: { this.departmentArr = data; } break;
          case 2: { this.priviligeArr = data; } break;
        }
        this.blockUI.stop();
      });
    }
  }

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }

  modalEmployee(row) {
    console.log("new/edit employee", row);
    const modalRef = this.modalService.open(NewEmployeesModalComponent, {size : 'md'});
    modalRef.componentInstance.employeeItem = { 'data': row };
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

  deleteEmployee(row) {
    this.blockUI.start('Loading...');
    this.employeesService.deleteEmployee(row.id).subscribe(employeesService => {
      this.getRequest();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg ,
        showConfirmButton: false,
        timer: 2000
      })
    },
      (error) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.deleteMsg ,
          showConfirmButton: false,
          timer: 2000
        })
        this.blockUI.stop();
        this.getRequest();
      }
    );
  }

  clarAll() {
    this.offset = 0,
    this.limit = 15,
    this.selName = '';
    this.selDepartment = '';
    this.selPrevilege = '';
    this.getRequest();
  }
}
