import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilesService } from '../../../@core/services/profiles.service';
import Swal from 'sweetalert2';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-new-profile-modal',
  templateUrl: './new-profile-modal.component.html',
  styleUrls: ['./new-profile-modal.component.scss'],
})
export class NewProfileModalComponent implements OnInit {
  @Input() public profileItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public uploader: FileUploader = new FileUploader({
    url: '',
    isHTML5: true
  });
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
  public sectionProfiles: any;
  public rowsSpeed: Array<any> = [];
  public sectionFiles: Array<any> = [];
  public isEditableRowSpeed = {};
  public howSpeedTable: boolean;
  public isEditableRowsLength = {};
  public rowsLength: Array<any> = [];
  public groupCode: Array<any> = [];
  public alloyArr: Array<any> = [];
  public validation: boolean;
  public disableTab: boolean = true;
  public profileId: number;


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
    this.createProfileForm = this.formBuilder.group({
      profileName: ['', Validators.required],
      groupCode: [''],
      usage: ['', Validators.required],
      visSides: ['', Validators.required],
      size1: ['', Validators.required],
      size2: ['', Validators.required],
      size3: ['', Validators.required],
      size4: ['', Validators.required],
      size1TolDown: ['', Validators.required],
      size1TolUp: ['', Validators.required],
      size2TolDown: ['', Validators.required],
      size2TolUp: ['', Validators.required],
      size3TolDown: ['', Validators.required],
      size3TolUp: ['', Validators.required],
      size4TolDown: ['', Validators.required],
      size4TolUp: ['', Validators.required],
      grM: ['', Validators.required],
      section: ['', Validators.required],
      perimeter: ['', Validators.required],
      cooling: [''],
      addOperations: [''],
      tbillet: [''],
      texit: [''],
      basketOrdering: [''],
      inUse: ['', Validators.required],
      puller: [''],
      notesExtrusion: [''],
      important: [''],
    });

    console.log('this.profile: ', this.profile);
    if (this.profile.id) {
      this.getProfileDies(this.profile.id);
      this.getProfiles(this.profile.id);
      this.getProfilesEnds(this.profile.id);
      this.getFiles(this.profile.id);
    }
    this.getAlloy();
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
    this.profilesService.getProfiles(id).subscribe(data => {
      console.log("getProfiles", data);
      data == null ? this.sectionProfiles = {} : this.sectionProfiles = data;
      this.profileId = data.id;
      this.createProfileForm = this.formBuilder.group({
        profileName: this.sectionProfiles.profileName,
        groupCode: this.sectionProfiles.groupCode,
        inUse: this.sectionProfiles.inUse,
        visSides: this.sectionProfiles.visSides,
        size1: this.sectionProfiles.size1,
        size2: this.sectionProfiles.size2,
        size3: this.sectionProfiles.size3,
        size4: this.sectionProfiles.size4,
        size1TolDown: this.sectionProfiles.size1TolDown,
        size1TolUp: this.sectionProfiles.size1TolUp,
        size2TolDown: this.sectionProfiles.size2TolDown,
        size2TolUp: this.sectionProfiles.size2TolUp,
        size3TolDown: this.sectionProfiles.size3TolDown,
        size3TolUp: this.sectionProfiles.size3TolUp,
        size4TolDown: this.sectionProfiles.size4TolDown,
        size4TolUp: this.sectionProfiles.size4TolUp,
        grM: this.sectionProfiles.grM,
        section: this.sectionProfiles.section,
        perimeter: this.sectionProfiles.perimeter,
        cooling: this.sectionProfiles.cooling,
        addOperations: this.sectionProfiles.addOperations,
        tbillet: this.sectionProfiles.tbillet,
        texit: this.sectionProfiles.texit,
        basketOrdering: this.sectionProfiles.basketOrdering,
        usage: this.sectionProfiles.usage,
        puller: this.sectionProfiles.puller,
        notesExtrusion: this.sectionProfiles.notesExtrusion,
        important: this.sectionProfiles.important
      });
      this.loading = false;

      console.log('getProfiles: this.createProfileForm.invalid', this.createProfileForm.invalid);
      this.disableTab = false;
    });
  }

  getFiles(id) {
    this.loading = true;
    console.log('getFiles: ', id);
    this.profilesService.getFiles(id).subscribe(data => {
      this.sectionFiles = data;
      this.uploader.queue = data;
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
  getProfilesEnds(id) {
    this.loading = true;
    this.profilesService.getProfilesEnds(id).subscribe((data) => {
      this.rowsLength = data;
      this.loading = false;
    });
  }

  getAlloy() {
    this.loading = true;
    this.profilesService.getAlloy().subscribe((data) => {
      this.alloyArr = data;
      this.loading = false;
    });
  }

  fillEndChannels(row) {
    console.log("fillEndChannels:", row);
    if (row.channels == null) {
      row.channels = 2;
    }
  }

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

  pressEndValidation(row: any): boolean {
    console.log("invalid++++++:", row);
    if (row.alloyFamily == "") {
      return false;
    } else if (row.channels == "") {
      return false;
    } else if (row.lengthEnd == "") {
      return false;
    } else if (row.lengthStart == "") {
      return false;
    } else {
      return true
    }
  }

  saveRowsLength(rowsLength, row, ind) {
    console.log("save row", rowsLength, ind);
    this.isEditableRowsLength[ind] = false;
    let flag = false;
    let obj;
    for (let i = 0; i < this.rowsLength.length; i++) {
      if (this.rowsLength[i].profileId) {
        if (!row.profileId && this.rowsLength[i].alloyFamily == row.alloyFamily) {
          console.log('Duplicate row');
          Swal.fire({
            position: 'bottom-end',
            icon: 'warning',
            title: this.translateSnackBar.dublicateAlloyMSg,
            showConfirmButton: false,
            timer: 2000
          })
          flag = true;
          break;
        }
      }
    }

    if (!flag) {
      this.validation = this.pressEndValidation(rowsLength[ind]);
      if (this.validation) {
        obj = {
          channels: row.channels,
          alloyFamily: row.alloyFamily,
          profileId: row.profileId ? row.profileId : this.profileId,
          lengthStart: Number(row.lengthStart),
          lengthEnd: row.lengthEnd,
          lastModified: new Date(),
          rowVersion: row.rowVersion == undefined ? ind : row.rowVersion,
          lastModifiedBy: this.userName,
          created: row.profileId ? row.created : new Date(),
        }
        console.log('obj End', obj, row, this.profileId);
        if (row.profileId) {
          this.profilesService.updateRowsEnd(obj).subscribe(matrixService => {
            this.getProfilesEnds(row.profileId);
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: this.translateSnackBar.saveMsg,
              showConfirmButton: false,
              timer: 2000
            })
          },
            (error) => {
              Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: error.status == 304 ? this.translateSnackBar.makeChange : 'Error',
                showConfirmButton: false,
                timer: 2000
              })
              this.loading = false;
            }
          );
        } else {
          // obj.channels = row.channels;
          // obj.alloyFamily = row.alloyFamily;
          this.profilesService.createRowsEnd(obj).subscribe(matrixService => {
            this.getProfilesEnds(matrixService.profileId);
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: this.translateSnackBar.saveMsg,
              showConfirmButton: false,
              timer: 2000
            })
          },
            (error) => {
              Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: 'Error',
                showConfirmButton: false,
                timer: 2000
              })
              this.loading = false;
            }
          );
        }
      } else {
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: this.translateSnackBar.fillAllMsg,
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }

  deleteRowsLength(rowsLength, row, ind) {
    console.log("delete row", rowsLength, ind);
    this.isEditableRowsLength[ind] = false;
    this.profilesService.deleteRowsEnd(row.profileId, row.alloyFamily).subscribe(matrixService => {
      this.getProfilesEnds(row.profileId);
      this.loading = false;
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg,
        showConfirmButton: false,
        timer: 2000
      })
    },
      (error) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 2000
        })
        this.loading = false;
        this.getProfilesEnds(row.profileId);
      }
    );
  }

  submitForm() {
    console.log('submitForm', this.profile);
    let obj;
    this.submitted = true;
    obj = {
      profileName: this.createProfileForm.controls.profileName.value,
      groupCode: this.createProfileForm.controls.groupCode.value,
      section: this.createProfileForm.controls.section.value,
      perimeter: this.createProfileForm.controls.perimeter.value,
      size1: this.createProfileForm.controls.size1.value,
      size2: this.createProfileForm.controls.size2.value,
      size3: this.createProfileForm.controls.size3.value,
      size4: this.createProfileForm.controls.size4.value,
      grM: this.createProfileForm.controls.grM.value,
      size1TolDown: this.createProfileForm.controls.size1TolDown.value,
      size1TolUp: this.createProfileForm.controls.size1TolUp.value,
      size2TolDown: this.createProfileForm.controls.size2TolDown.value,
      size2TolUp: this.createProfileForm.controls.size2TolUp.value,
      size3TolDown: this.createProfileForm.controls.size3TolDown.value,
      size3TolUp: this.createProfileForm.controls.size3TolUp.value,
      size4TolDown: this.createProfileForm.controls.size4TolDown.value,
      size4TolUp: this.createProfileForm.controls.size4TolUp.value,
      usage: this.createProfileForm.controls.usage.value,
      visSides: this.createProfileForm.controls.visSides.value,
      extrusionSpeed: "",
      opPerf: "",
      extrusionSpeedSms: "",
      opPerfSms: "",
      tbillet: this.createProfileForm.controls.tbillet.value,
      texit: this.createProfileForm.controls.texit.value,
      puller: this.createProfileForm.controls.puller.value,
      scrapStart: "",
      scrapStartSms: "",
      scrapEnd: "",
      tension: "",
      cooling: this.createProfileForm.controls.cooling.value,
      coolingSms: "",
      coolingAdd: "",
      rowVersion: 1,
      lastModifiedBy: this.userName,
      basketOrdering: this.createProfileForm.controls.basketOrdering.value,
      addOperations: this.createProfileForm.controls.addOperations.value,
      notesExtrusion: this.createProfileForm.controls.notesExtrusion.value,
      important: this.createProfileForm.controls.important.value,
      created: new Date(),
      lastModified: new Date(),
      modifiedOn: new Date(),
      inUse: this.createProfileForm.controls.inUse.value,
      ts: '',
      primaryPress: null,
      alternativePress: null,
      thickness: null,
      sideWidth: null
    }
    console.log('obj', obj, this.profile, this.profileId);
    if(!this.createProfileForm.invalid){
      if (this.profileId) {
        //edit
        obj.id = this.profile != 'new' ? this.profile.id : this.profileId;
        this.profilesService.updateProfile(obj, this.profile.id).subscribe((profileService) => {
          // this.activeModal.dismiss();
          // this.passEntry.emit(true);
          console.log('profileService', profileService);
          this.profileId = profileService['id'];
          this.disableTab = false;
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: this.translateSnackBar.saveMsg,
            showConfirmButton: false,
            timer: 2000
          });
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
            // this.activeModal.dismiss();
            // this.passEntry.emit(true);
            this.profileId = profileService['id'];
            this.createProfileForm.controls.profileName.setValue(profileService['profileName']);
            this.disableTab = false;
            console.log('TUK++', profileService, this.profile.id);
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: this.translateSnackBar.saveMsg,
              showConfirmButton: false,
              timer: 2000
            });
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

  handleUpload(event) {
    console.log('handleUpload', event, this.uploader);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploader.queue[this.uploader.queue.length - 1].url = reader.result.toString().replace(/^data:image\/[a-z]+;base64,/, "");
      console.log(this.uploader.queue);
    };
  }

  uploadImage(row) {
    console.log("uploadImage", row);
    let obj = {
      id: this.profile.id,
      profileId: this.profile.id,
      fileName: row.file ? row.file.name : row.fileName,
      fileData: row.url ? row.url : row.fileData
    }
    console.log("obj", obj);
    this.loading = true;
    this.profilesService.uploadFile(this.profile.id, obj, row).subscribe((data) => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.saveMsg,
        showConfirmButton: false,
        timer: 2000
      })
      this.getFiles(this.profile.id);
      this.loading = false;
    }, (error) => {
      this.loading = false;
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
    });
  }

  deleteImage(row) {
    console.log("deleteImage", row);
    this.loading = true;
    this.profilesService.deleteImage(row.id).subscribe((profileService) => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.saveMsg,
        showConfirmButton: false,
        timer: 2000
      })
      this.loading = false;
      this.getFiles(this.profile.id);
    }, (error) => {
      this.loading = false;
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.saveMsg,
        showConfirmButton: false,
        timer: 2000
      })
      this.getFiles(this.profile.id);
    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
