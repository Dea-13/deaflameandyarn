import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../../@core/services/employees.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-new-employees-modal',
  templateUrl: './new-employees-modal.component.html',
  styleUrls: ['./new-employees-modal.component.scss'],
})
export class NewEmployeesModalComponent implements OnInit {
  @Input() public employeeItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @BlockUI('block') blockUI: NgBlockUI;
  public createEmployeeForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public employee: any;
  public translateSnackBar: any;

  constructor(
    private employeeService: EmployeesService,
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
      this.blockUI.start('Loading...');

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
            this.blockUI.stop();
          },
          (error) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'warning',
              title: 'Error',
              showConfirmButton: false,
              timer: 2000
            })
            this.blockUI.stop();
          });
      } else {
        //create
        this.employeeService.createEmployee(obj).subscribe(
          (employeeService) => {
            this.activeModal.dismiss();
            this.passEntry.emit(true);
            this.blockUI.stop();
          },
          (error) => {
            this.blockUI.stop();
            Swal.fire({
              position: 'bottom-end',
              icon: 'warning',
              title: 'Error',
              showConfirmButton: false,
              timer: 2000
            })
          }
        );
      }
    } else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.fillMsg ,
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
