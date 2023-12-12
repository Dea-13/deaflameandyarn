import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../../@core/services/employees.service';
import Swal from 'sweetalert2';
import { MatrixService } from '../../../@core/services/matrix.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-generate-test-modal',
  templateUrl: './generate-test-modal.component.html',
  styleUrls: ['./generate-test-modal.component.scss']
})
export class GenerateTestModalComponent implements OnInit {
  @BlockUI('block') blockUI: NgBlockUI;
  @Input() public testItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public createTestForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public loading: boolean = false;
  public translateSnackBar: any;
  public pressArr: Array<any> = [];

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    // this.userName = JSON.parse(localStorage.getItem('_currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.createTestForm = this.formBuilder.group({
      choosePress: ['', Validators.required],
      chooseKg: ['', Validators.required],
      chooseAlloy: ['', Validators.required],
    });

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.getPress();
  }

  getPress() {
    this.blockUI.start('Loading...');
    this.matrixService.getPress().subscribe((data) => {
      this.pressArr = data;
      this.blockUI.stop();
    });
  }

  submitForm() {
    console.log('submitForm', !this.createTestForm.invalid, this.testItem.dieId);
    this.submitted = true;
    if (!this.createTestForm.invalid) {
      this.blockUI.start('Loading...');
      this.matrixService.generateTest(this.createTestForm.controls.chooseKg.value, this.createTestForm.controls.chooseAlloy.value, this.createTestForm.controls.choosePress.value, this.testItem.dieId).subscribe((matrixService) => {
        this.activeModal.dismiss();
        this.passEntry.emit(true);
        this.blockUI.stop();
      },
        (error) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: this.translateSnackBar.saveMsg,
            showConfirmButton: false,
            timer: 2000
          })
          this.activeModal.dismiss();
          this.passEntry.emit(true);
          this.blockUI.stop();
        });
    } else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.fillMsg,
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
