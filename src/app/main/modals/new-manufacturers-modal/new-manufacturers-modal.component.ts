import { ManufacturersService } from './../../../@core/services/manufacturers.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-manufacturers-modal',
  templateUrl: './new-manufacturers-modal.component.html',
  styleUrls: ['./new-manufacturers-modal.component.scss'],
})
export class NewManufacturersModalComponent implements OnInit {
  @Input() public manufacturerItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public createManufacturerForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public loading: boolean = false;
  public manufacturer: any;
  public translateSnackBar: any;

  constructor(
    private manufacturersService: ManufacturersService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.manufacturer = this.manufacturerItem.data;
    this.createManufacturerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.email]],
      email: ['', Validators.required],
      defaultShipmentTerms: ['', Validators.required],
    });

    if (this.manufacturer.id) {
      this.createManufacturerForm = this.formBuilder.group({
        name: this.manufacturer.name,
        email: this.manufacturer.email,
        defaultShipmentTerms: this.manufacturer.defaultShipmentTerms,
      });
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  submitForm() {
    console.log(
      'submitForm',
      this.createManufacturerForm,
      this.manufacturer
    );
    this.submitted = true;
    let obj;
    if (this.createManufacturerForm.controls.email.status == 'INVALID') {
      return this.toastrService.error(this.translateSnackBar.emailMsg, '', {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
      });
    }
    if (!this.createManufacturerForm.invalid) {
      this.loading = true;

      obj = {
        name: this.createManufacturerForm.controls.name.value,
        email: this.createManufacturerForm.controls.email.value,
        defaultShipmentTerms: this.createManufacturerForm.controls.defaultShipmentTerms.value,
      };
      console.log('obj', obj);

      if (this.manufacturer.id) {
        //edit
        obj.id = this.manufacturer.id;
        this.manufacturersService
          .updateManufacturer(obj)
          .subscribe((manufacturersService) => {
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
        this.manufacturersService.createManufacturer(obj).subscribe(
          (manufacturersService) => {
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
