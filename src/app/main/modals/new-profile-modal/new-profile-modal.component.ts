import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilesService } from '../../../@core/services/profiles.service';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-new-profile-modal',
  templateUrl: './new-profile-modal.component.html',
  styleUrls: ['./new-profile-modal.component.scss'],
})
export class NewProfileModalComponent implements OnInit {
  @Input() public profileItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public createProfileForm: FormGroup;
  public submitted: boolean;
  public userName: string;
  public loading: boolean = false;
  public profile: any;
  public translateSnackBar: any;
  public rows = [];
  public loadingIndicator = true;
  public reorderable = true;
  public columnsFirstTable = [{ name: '', prop: '' }];
  public columnsSecondTable = [{ name: '', prop: '' }];
  public ColumnMode = ColumnMode;
  public active = 1;

  constructor(
    private profilesService: ProfilesService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.profile = this.profileItem.data;
    this.createProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      privilege: ['', Validators.required],
    });

    if (this.profile.id) {
      this.createProfileForm = this.formBuilder.group({
        name: this.profile.name,
        department: this.profile.department,
        privilege: this.profile.privilege,
      });
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.makeTable();
  }

  makeTable() {
    this.columnsFirstTable = [
      { name: this.translateSnackBar.matrix, prop: 'name' },
      { name: this.translateSnackBar.resource, prop: 'name' },
      { name: this.translateSnackBar.forPress, prop: 'name' },
      { name: this.translateSnackBar.size, prop: 'name' },
      { name: this.translateSnackBar.client, prop: 'name' },
      { name: this.translateSnackBar.produced, prop: 'name' },
      { name: this.translateSnackBar.lastActivity, prop: 'name' },
      { name: this.translateSnackBar.storageFreePlace, prop: 'name' },
    ];

    this.columnsSecondTable = [
      { name: this.translateSnackBar.file, prop: 'name' },
      { name: this.translateSnackBar.size, prop: 'name' }
    ];
  }

  submitForm() {
    console.log('submitForm', !this.createProfileForm.invalid, this.profile);
    this.submitted = true;
    let obj;
    if (!this.createProfileForm.invalid) {
      this.loading = true;

      obj = {
        // name: this.createProfileForm.controls.name.value,
        // department: this.createProfileForm.controls.department.value,
        // privilege: this.createProfileForm.controls.privilege.value,
      };
      console.log('obj', obj);

      if (this.profileItem.id) {
        //edit
        obj.id = this.profile.id;
        this.profilesService.updateProfile(obj).subscribe((profileService) => {
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
        this.profilesService.createProfile(obj).subscribe(
          (profileService) => {
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
