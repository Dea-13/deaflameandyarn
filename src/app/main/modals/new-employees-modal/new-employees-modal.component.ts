import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../../@core/services/employees.service';

@Component({
  selector: 'app-new-employees-modal',
  templateUrl: './new-employees-modal.component.html',
  styleUrls: ['./new-employees-modal.component.scss'],
})
export class NewEmployeesModalComponent implements OnInit {
  @Input() public employeeItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public createEmployeeForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public loading: boolean = false;
  public employee: any;
  public translateSnackBar: any;

  constructor(
    private employeeService: EmployeesService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.employee = this.employeeItem.data;
    this.createEmployeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      privilege: ['', Validators.required],
    });

    if (this.employee.id) {
      this.createEmployeeForm = this.formBuilder.group({
        name: this.employee.name,
        department: this.employee.department,
        privilege: this.employee.privilege,
      });
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  submitForm() {
    console.log(
      'submitForm',
      !this.createEmployeeForm.invalid,
      this.employee
    );
    this.submitted = true;
    let obj;
    if (!this.createEmployeeForm.invalid) {
      this.loading = true;

      obj = {
        name: this.createEmployeeForm.controls.name.value,
        department: this.createEmployeeForm.controls.department.value,
        privilege: this.createEmployeeForm.controls.privilege.value,
      };
      console.log('obj', obj);

      if (this.employee.id) {
        //edit
        obj.id = this.employee.id;
        obj.plant = this.employee.plant;
        this.employeeService
          .updateEmployee(obj)
          .subscribe((employeeService) => {
            this.activeModal.dismiss();
            this.passEntry.emit(true);
            this.loading = false;
            this.toastrService.success(this.translateSnackBar.succesMsg, '', {
              toastClass: 'toast ngx-toastr',
              closeButton: true,
            });
          });
      } else {
        //create
        this.employeeService.createEmployee(obj).subscribe(
          (employeeService) => {
            this.activeModal.dismiss();
            this.passEntry.emit(true);
            this.loading = false;
            this.toastrService.success(this.translateSnackBar.succesMsg, '', {
              toastClass: 'toast ngx-toastr',
              closeButton: true,
            });
          },
          (error) => {
            this.toastrService.error(error.error);
          }
        );
      }
    } else {
      this.toastrService.error(this.translateSnackBar.fillMsg, '', {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
      });
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
