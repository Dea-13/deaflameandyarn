import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesService } from '../../../@core/services/employees.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEmployeesModalComponent } from '../../modals/new-employees-modal/new-employees-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  // Public
  displayedColumns: string[] = ['name', 'department', 'privilege'];
  public urls = [
    { id: 0, name: 'name' },
    { id: 1, name: 'department' },
    { id: 2, name: 'privilege' }
  ];
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
  ) {}

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
    this.employeesService
    .getEmployees(this.offset, this.limit, this.selName, this.selDepartment, this.selPrevilege)
    .subscribe((data) => {
      this.rows = data.list;
      this.totalResult = data.total;
      this.loading = false;
    });
  }

  getFilters() {
    this.loading = true;
    for (let i = 0; i < this.urls.length; i++) {
      this.employeesService.getFilters(this.urls[i].name).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0:
            {
              this.nameArr = data;
            }
            break;
          case 1:
            {
              this.departmentArr = data;
            }
            break;
          case 2:
            {
              this.priviligeArr = data;
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

  modalEmployee(row) {
    console.log("new/edit employee");
    const modalRef = this.modalService.open(NewEmployeesModalComponent, {});
    modalRef.componentInstance.employeeItem = { 'data': row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest(10);
      }
    });
  }
}
