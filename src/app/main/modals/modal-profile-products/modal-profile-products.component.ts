import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfilesService } from '../../../@core/services/profiles.service';

@Component({
  selector: 'app-modal-profile-products',
  templateUrl: './modal-profile-products.component.html',
  styleUrls: ['./modal-profile-products.component.scss']
})
export class ModalProfileProductsComponent implements OnInit {
  @Input() public productItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public createProductForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public loading: boolean = false;
  public product: any;
  public translateSnackBar: any;

  constructor(
    private productService: ProfilesService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.product = this.productItem.data;
    console.log( 'product', this.product);
    this.createProductForm = this.formBuilder.group({
      erpitem: ['', Validators.required],
      erpvariant: ['', Validators.required],
      opNo: ['', Validators.required],
      cnc1: ['', Validators.required],
      cnc2: ['', Validators.required],
      subContractor1: ['', Validators.required],
      punching1: ['', Validators.required],
      punching2: ['', Validators.required],
      garda3: ['', Validators.required],
      minutesPerPiece: ['', Validators.required],
      weightPerPiece: ['', Validators.required],
      lprkr: ['', Validators.required],
      lobr: ['', Validators.required],
      npr: ['', Validators.required],
      setupSameProfile: ['', Validators.required],
      setupOtherProfile: ['', Validators.required],
    });

    if (this.product != 'new') {
      this.createProductForm = this.formBuilder.group({
        erpitem: this.product.erpitem,
        erpvariant: this.product.erpvariant,
        opNo: this.product.opNo,
        cnc1: this.product.cnc1Id,
        cnc2: this.product.cnc2Id,
        subContractor1: this.product.subContractor1Id,
        punching1: this.product.punching1,
        punching2: this.product.punching2,
        garda3: this.product.garda3,
        minutesPerPiece: this.product.minutesPerPiece,
        weightPerPiece: this.product.weightPerPiece,
        lprkr: this.product.lprkr,
        lobr: this.product.lobr,
        npr: this.product.npr,
        setupSameProfile: this.product.setupSameProfile,
        setupOtherProfile: this.product.setupOtherProfile,
      });
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  submitForm() {
    console.log( 'submitForm', this.createProductForm, this.product);
    this.submitted = true;
    let obj;
    if (!this.createProductForm.invalid) {
      this.loading = true;

      obj = {
        erpitem: this.createProductForm.controls.erpitem.value,
        erpvariant: this.createProductForm.controls.erpvariant.value,
        opNo: this.createProductForm.controls.opNo.value,
        cnc1: this.createProductForm.controls.cnc1.value,
        cnc2: this.createProductForm.controls.cnc2.value,
        subContractor1: this.createProductForm.controls.subContractor1.value,
        punching1: this.createProductForm.controls.punching1.value,
        punching2: this.createProductForm.controls.punching2.value,
        garda3: this.createProductForm.controls.garda3.value,
        minutesPerPiece: this.createProductForm.controls.minutesPerPiece.value,
        weightPerPiece: this.createProductForm.controls.weightPerPiece.value,
        lprkr: this.createProductForm.controls.lprkr.value,
        lobr: this.createProductForm.controls.lobr.value,
        npr: this.createProductForm.controls.npr.value,
        setupSameProfile: this.createProductForm.controls.setupSameProfile.value,
        setupOtherProfile: this.createProductForm.controls.setupOtherProfile.value,
        finalTreatment: false,
        created: new Date(),
        lastModified: new Date(),
        rowVersion: 1,
        lastModifiedBy: this.userName,
      };
      console.log('obj', obj);

      if (this.product != 'new') {
        //edit
        this.productService.updateProductProfile(obj).subscribe((employeeService) => {
            this.activeModal.dismiss();
            this.passEntry.emit(true);
            this.loading = false;
          },
          (error) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'warning',
              title: error.error,
              showConfirmButton: false,
              timer: 2000
            })
            this.loading = false;
          });
      } else {
        //create
        this.productService.createProductProfile(obj).subscribe((employeeService) => {
            this.activeModal.dismiss();
            this.passEntry.emit(true);
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              icon: 'warning',
              title: error.error,
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
