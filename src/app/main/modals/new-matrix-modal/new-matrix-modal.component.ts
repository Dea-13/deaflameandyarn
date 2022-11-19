import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatrixService } from '../../../@core/services/matrix.service';

@Component({
  selector: 'app-new-matrix-modal',
  templateUrl: './new-matrix-modal.component.html',
  styleUrls: ['./new-matrix-modal.component.scss']
})
export class NewMatrixModalComponent implements OnInit {
  @Input() public matrixItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public createMatrixForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public loading: boolean = false;
  public matrix: any;
  public translateSnackBar: any;
  public columnsFirstTable: Array<any> = [];
  public columnsSecondTable: Array<any> = [];
  public rows = [];

  constructor(
    private matrixService: MatrixService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.matrix = this.matrixItem.data;
    this.createMatrixForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      privilege: ['', Validators.required],
    });

    if (this.matrix.id) {
      this.createMatrixForm = this.formBuilder.group({
        name: this.matrix.name,
        department: this.matrix.department,
        privilege: this.matrix.privilege,
      });
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  submitForm() {
    console.log(
      'submitForm',
      !this.createMatrixForm.invalid,
      this.matrix
    );
    this.submitted = true;
    let obj;
    if (!this.createMatrixForm.invalid) {
      this.loading = true;

      obj = {
        // name: this.createMatrixForm.controls.name.value,
        // department: this.createMatrixForm.controls.department.value,
        // privilege: this.createMatrixForm.controls.privilege.value,
      };
      console.log('obj', obj);

      if (this.matrixItem.id) {
        //edit
        obj.id = this.matrix.id;
        this.matrixService
          .updateMatrix(obj)
          .subscribe((matrixService) => {
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
        this.matrixService.createMatrix(obj).subscribe(
          (matrixService) => {
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
