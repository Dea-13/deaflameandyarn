import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilesService } from '../../../@core/services/profiles.service';
import Swal from 'sweetalert2';

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
  public active = 1;
  public cooling: string = '';
  public addOperations: string = '';
  public texit: string = '';
  public tbillet: string = '';
  public basketOrdering: string = '';
  public inUse: string = '';
  public puller: string = '';
  public notesExtrusion: string = '';
  public important: string = '';
  public scrapStart: string = '';
  public scrapEnd: string = '';
  public rowsDies: Array<any> = [];
  public sectionProfiles: any = {};
  public rowsSpeed: Array<any> = [];
  public isEditableRowSpeed = {};
  public howSpeedTable: boolean;
  public isEditableRowsLength = {};
  public rowsLength: Array<any> = [];
  public groupCode: Array<any> = [];


  constructor(
    private profilesService: ProfilesService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.profile = this.profileItem.data;
    console.log('this.profile: ', this.profile);
    if (this.profile.id) {
      this.getProfileDies(this.profile.id);
      this.getProfiles(this.profile.id);
    }
    this.getGroupCode();

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  //---------------------------------------------------------SECTION PROFILES----------------------------------------------
  getProfileDies(id) {
    this.loading = true;
    console.log('getProfileDies: ', id);
    this.profilesService.getProfileDies(id).subscribe(data => {
      console.log("getProfileDies", data);
      this.rowsDies = data;
      this.loading = false;
    });
  }

  getProfiles(id) {
    this.loading = true;
    console.log('getProfiles: ', id);
    this.profilesService.getProfiles(id).subscribe(data => {
      console.log("getProfiles", data);
      this.sectionProfiles = data;
      this.loading = false;
    });
  }

  getGroupCode() {
    this.loading = true;
    this.profilesService.getGroupCode().subscribe(data => {
      console.log("getGroupCode", data);
      this.groupCode = data;
      this.loading = false;
    });
  }

  //---------------------------------------------------------SECTION SPEEDS----------------------------------------------
  addRowSpeedTable(rowsSpeed) {
    console.log("add row", rowsSpeed);
    let emptyRow = {
      cavities: "",
      alloy: "",
    };
    this.rowsSpeed.push(emptyRow);
    this.rowsSpeed = [...this.rowsSpeed];
  }

  saveRowsSpeed(rowsSpeed, ind) {
    console.log("save row", rowsSpeed, ind);
    this.isEditableRowSpeed[ind] = false;
  }

  deleteRowsSpeed(rowsSpeed, ind) {
    console.log("delete row", rowsSpeed, ind);
    this.isEditableRowSpeed[ind] = false;
  }

  //---------------------------------------------------------SECTION FRONT/BACK END LENGTHS----------------------------------------------
  addRowSpeedLength(rowsLength) {
    console.log("add row", rowsLength);
    let emptyRow = {
      channels: "",
      alloy: "",
      lengthStart: "",
      lengthEnd: "",
    };
    this.rowsLength.push(emptyRow);
    this.rowsLength = [...this.rowsLength];
  }

  saveRowsLength(rowsLength, ind) {
    console.log("save row", rowsLength, ind);
    this.isEditableRowsLength[ind] = false;
  }

  deleteRowsLength(rowsLength, ind) {
    console.log("delete row", rowsLength, ind);
    this.isEditableRowsLength[ind] = false;
  }

  submitForm() {
    console.log('submitForm', this.profile);
    let obj;
    this.submitted = true;
    obj = {
      profileName: this.sectionProfiles.profileName,
      groupCode: this.sectionProfiles.groupCode,
      section: this.sectionProfiles.section,
      perimeter: this.sectionProfiles.perimeter,
      size1: this.sectionProfiles.size1,
      size2: this.sectionProfiles.size2,
      size3: this.sectionProfiles.size3,
      size4: this.sectionProfiles.size4,
      grM: null,
      size1TolDown: null,
      size1TolUp: null,
      size2TolDown: null,
      size2TolUp: null,
      size3TolDown: null,
      size3TolUp: null,
      size4TolDown: null,
      size4TolUp: null,
      usage: "",
      visSides: "",
      extrusionSpeed: "",
      opPerf: "",
      extrusionSpeedSms: "",
      opPerfSms: "",
      tbillet: '',
      texit: '',
      puller: '',
      scrapStart: "",
      scrapStartSms: "",
      scrapEnd: "",
      tension: "",
      cooling: '',
      coolingSms: "",
      coolingAdd: "",
      rowVersion: null,
      lastModifiedBy: this.userName,
      basketOrdering: '',
      addOperations: '',
      notesExtrusion: '',
      important: '',
      created: new Date(),
      lastModified: new Date(),
      modifiedOn: new Date(),
      inUse: this.sectionProfiles.inUse,
      ts: '',
      primaryPress: null,
      alternativePress: null,
      thickness: null,
      sideWidth: null
    }

    if (this.profile.id) {
      //edit
      obj.id = this.profile.id;
      this.profilesService.updateProfile(obj, this.profile.id).subscribe((profileService) => {
        this.activeModal.dismiss();
        this.passEntry.emit(true);
        this.loading = false;
      },
        (error) => {
          this.loading = false;
          Swal.fire({
            position: 'bottom-end',
            icon: 'warning',
            title: 'Error',
            showConfirmButton: false,
            timer: 2000
          })
        });
    } else {
      //create
      this.profilesService.createProfile(obj).subscribe(
        (profileService) => {
          this.activeModal.dismiss();
          this.passEntry.emit(true);
          this.loading = false;
        },
        (error) => {
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
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
