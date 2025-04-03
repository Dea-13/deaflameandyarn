import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilesService } from '../../../@core/services/profiles.service';
import Swal from 'sweetalert2';
import { FileUploader } from 'ng2-file-upload';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-new-profile-modal',
  templateUrl: './new-profile-modal.component.html',
  styleUrls: ['./new-profile-modal.component.scss'],
})
export class NewProfileModalComponent implements OnInit {
  @Input() public profileItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @BlockUI('blockModal') blockUI: NgBlockUI;
  public uploader: FileUploader = new FileUploader({
    url: '',
    isHTML5: true
  });
  public mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
  public createProfileForm: FormGroup;
  public submitted: boolean;
  public userName: string;
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
  public validation: boolean = true;
  public disableTab: boolean = true;
  public profileId: number;
  public fullScr: boolean = false;
  public img: any;
  public tabSpeed: Array<any> = [];
  public pressArr: Array<any> = [];
  public editPress = {};


  constructor(
    private profilesService: ProfilesService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.userName = JSON.parse(localStorage.getItem('_currentUser')).userName;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.profile = this.profileItem.data;
    this.createProfileForm = this.formBuilder.group({
      profileName: ['', Validators.required],
      refNumber: [''],
      crNumber: [''],
      groupCode: [''],
      revisionProfile: [''],
      usage: [''],
      visSides: [false],
      followProfile: [false],
      size1: [null],
      size2: [null],
      size3: [null],
      size4: [null],
      size1TolDown: [null],
      size1TolUp: [null],
      size2TolDown: [null],
      size2TolUp: [null],
      size3TolDown: [null],
      size3TolUp: [null],
      size4TolDown: [null],
      size4TolUp: [null],
      grM: [null, Validators.required],
      section: [null, Validators.required],
      perimeter: [null, Validators.required],
      cooling: [''],
      addOperations: [''],
      tbillet: [''],
      texit: [''],
      basketOrdering: [''],
      inUse: [null],
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
      this.getProfilesByPress();
    }
    this.getPress();
    this.getAlloy();
    this.getGroupCode();

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  fullScreen(){
    this.fullScr == false ? this.fullScr = true : this.fullScr = false;
    console.log('this.fullScr', this.fullScr)
  }

  //---------------------------------------------------------SECTION PROFILES----------------------------------------------
  getProfileDies(id) {
    this.blockUI.start('Loading...');
    console.log('getProfileDies: ', id);
    this.profilesService.getProfileDies(id).subscribe(data => {
      console.log("getProfileDies", data);
      this.rowsDies = data;
      this.blockUI.stop();
    });
  }

  getProfiles(id) {
    this.blockUI.start('Loading...');
    this.profilesService.getProfiles(id).subscribe(data => {
      console.log("getProfiles", data);
      data == null ? this.sectionProfiles = {} : this.sectionProfiles = data;
      this.profileId = data == null ? null : data.id;
      this.createProfileForm = this.formBuilder.group({
        profileName: this.sectionProfiles.profileName,
        refNumber: this.sectionProfiles.refNumber,
        crNumber: this.sectionProfiles.crNumber,
        groupCode: this.sectionProfiles.groupCode,
        revisionProfile: this.sectionProfiles.revisionProfile,
        inUse: this.sectionProfiles.inUse,
        visSides: this.sectionProfiles.visSides,
        followProfile: this.sectionProfiles.followProfile,
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
      this.blockUI.stop();

      console.log('getProfiles: this.createProfileForm.invalid', this.createProfileForm.invalid);
      this.disableTab = false;
    });
  }

  getFiles(id) {
    this.blockUI.start('Loading...');
    console.log('getFiles: ', id);
    this.profilesService.getFiles(id).subscribe(data => {
      data.forEach(function(item,i){
        if(item.fileName.includes('png') || item.fileName.includes('PNG')){
          data.splice(i, 1);
          data.unshift(item);
        }
      });
      this.sectionFiles = data;
      this.uploader.queue = data;
      console.log('getFiles: data', data);
      this.img = data.length > 0 ? data[0].fileData : ''
      this.blockUI.stop();
    });
  }

  getGroupCode() {
    this.blockUI.start('Loading...');
    this.profilesService.getGroupCode().subscribe(data => {
      console.log("getGroupCode", data);
      this.groupCode = data;
      this.blockUI.stop();
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
    this.blockUI.start('Loading...');
    this.profilesService.getProfilesEnds(id).subscribe((data) => {
      this.rowsLength = data;
      this.blockUI.stop();
    });
  }

  getAlloy() {
    this.blockUI.start('Loading...');
    this.profilesService.getAlloy().subscribe((data) => {
      this.alloyArr = data;
      this.blockUI.stop();
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
      pressId: null,
      channels: null,
      alloyFamily: '',
      lengthStart: null,
      lengthEnd: null,
    };
    this.validation = true;
    this.rowsLength.push(emptyRow);
    this.rowsLength = [...this.rowsLength];
  }

  pressEndValidation(row: any): boolean {
    console.log("invalid++++++:", row);
    if (row.pressId == null) {
      return false;
    } else if (row.alloyFamily == '') {
      return false;
    } else if (row.channels == null) {
      return false;
    } else if (row.lengthEnd == null) {
      return false;
    } else if (row.lengthStart == null) {
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
          pressId: row.pressId,
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
          this.profilesService.updateRowsEnd(obj).subscribe(profilesService => {
            this.getProfilesEnds(row.profileId);
            this.blockUI.stop();
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
              this.blockUI.stop();
            }
          );
        } else {
          // obj.channels = row.channels;
          // obj.alloyFamily = row.alloyFamily;
          this.profilesService.createRowsEnd(obj).subscribe(profilesService => {
            this.getProfilesEnds(profilesService.profileId);
            this.blockUI.stop();
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
              this.blockUI.stop();
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
    this.profilesService.deleteRowsEnd(row.profileId, row.alloyFamily).subscribe(profilesService => {
      this.getProfilesEnds(row.profileId);
      this.blockUI.stop();
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
        this.blockUI.stop();
        this.getProfilesEnds(row.profileId);
      }
    );
  }

  submitForm() {
    console.log('submitForm', this.profile, this.createProfileForm.controls.profileName.value.match(/_/g) != 'null', this.profile, this.createProfileForm.controls.profileName.value.match(/_/g) != null);
    let obj;
    this.submitted = true;
    obj = {
      profileName: this.createProfileForm.controls.profileName.value.replace("_",""),
      refNumber: this.createProfileForm.controls.refNumber.value,
      crNumber: this.createProfileForm.controls.crNumber.value,
      groupCode: this.createProfileForm.controls.groupCode.value,
      revisionProfile: this.createProfileForm.controls.revisionProfile.value,
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
      followProfile: this.createProfileForm.controls.followProfile.value,
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
    if(this.createProfileForm.controls.profileName.value.match(/_/g) != null && this.createProfileForm.controls.profileName.value.match(/_/g).length != 1){
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.maskProfile,
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }
    if (this.profileId) {
      if (this.createProfileForm.controls.profileName.value && this.createProfileForm.controls.grM.value && this.createProfileForm.controls.section.value) {
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
    } else {
      if (!this.createProfileForm.invalid) {
        //create
        this.profilesService.createProfile(obj).subscribe(
          (profileService) => {
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
            this.blockUI.stop();
            setTimeout(() => {
              if(this.uploader.queue) {
                for(let i=0; i < this.uploader.queue.length; i++) {
                  this.uploadImage(this.uploader.queue[i]);
                }
              }
            }, 500);
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
  }

  handleUpload(event) {
    console.log('handleUpload', event, this.uploader);
    if(event.target.files[0].name.substr(0, event.target.files[0].name.lastIndexOf(".")) != this.createProfileForm.controls.profileName.value) {
      console.log('++++++ 0', event.target.files[0].name.substr(0, event.target.files[0].name.lastIndexOf(".")), this.createProfileForm.controls.profileName.value);
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.validImg,
        showConfirmButton: false,
        timer: 4000
      })
    } else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploader.queue[this.uploader.queue.length - 1].url = reader.result.toString().replace(/^data:image\/[a-z]+;base64,/, "");
        console.log(this.uploader.queue);
        this.img = this.uploader.queue.length > 0 ? this.uploader.queue[this.uploader.queue.length - 1].url : ''
      };
    }
  }

  setImage(ind, item) {
    console.log("setImage", ind, item);
    this.img = item.url ? item.url : item.fileData;
  }

  uploadImage(row) {
    console.log("uploadImage", row, this.profileId);
    if(row.file.name.substr(0, row.file.name.lastIndexOf(".")) === this.createProfileForm.controls.profileName.value) {
      let id = this.profile.id ? this.profile.id : this.profileId;
      let obj = {
        id: id,
        profileId: id,
        fileName: row.file ? row.file.name : row.fileName,
        fileData: row.url ? row.url : row.fileData
      }
      console.log("obj", obj);
      this.blockUI.start('Loading...');
      this.profilesService.uploadFile(id, obj, row).subscribe((data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg,
          showConfirmButton: false,
          timer: 2000
        })
        this.getFiles(id);
        this.blockUI.stop();
      }, (error) => {
        this.blockUI.stop();
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 2000
        })
      });
    }
  }

  deleteImage(row) {
    console.log("deleteImage", row);
    this.blockUI.start('Loading...');
    this.profilesService.deleteImage(row.id).subscribe((profileService) => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg,
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
      this.getFiles(this.profile.id);
    }, (error) => {
      this.blockUI.stop();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg,
        showConfirmButton: false,
        timer: 2000
      })
      this.getFiles(this.profile.id);
    });
  }
  //////////////////////// TABLE PROFILE BY PRESS

  getProfilesByPress() {
    this.blockUI.start('Loading...');
    this.profilesService.getProfilesByPress(this.profile.id).subscribe((data) => {
      this.tabSpeed = data;
      this.blockUI.stop();
    });
  }

  getPress() {
    this.blockUI.start('Loading...');
    this.profilesService.getPress().subscribe((data) => {
      this.pressArr = data;
      this.blockUI.stop();
    });
  }

  addPress() {
    console.log("addPress");
    let emptyRow = {
      pressId: null,
      channels: null,
      priority: 1,
      alloyFamily: "",
      speed: null,
      extrusionSpeed: null,
      billetTemperature: '',
      dieTemperature: '',
    };
    this.tabSpeed.push(emptyRow);
    this.tabSpeed = [...this.tabSpeed];
  }

  fillPressChannels(row) {
    console.log("fillPressChannels:", row);
    if (row.channels == null) {
      row.channels = 2;
    }
  }

  pressValidation(row: any): boolean {
    console.log("invalid++++++:", row);
    if (row.pressId == null) {
      return false;
    } else if (row.channels == null) {
      return false;
    } else if (row.alloyFamily == "") {
      return false;
    } else if (row.speed == null) {
      return false;
    } else if (row.priority == null) {
      return false;
    } else if (row.extrusionSpeed == null) {
      return false;
    } else if (row.billetTemperature == '') {
      return false;
    } else if (row.dieTemperature == '') {
      return false;
    } else {
      return true
    }
  }

  saveRowsPress(rowsLength, row, ind) {
    console.log("saveRowsPress", rowsLength, row, ind);
    this.editPress[ind] = false;
    let flag = false;
    let obj;
    let url;
    for (let i = 0; i < this.tabSpeed.length; i++) {
      if (this.tabSpeed[i].id) {
        if (!row.id && (this.tabSpeed[i].pressId == row.pressId && this.tabSpeed[i].alloyFamily == row.alloyFamily)) {
          console.log('Duplicate row');
          Swal.fire({
            position: 'bottom-end',
            icon: 'warning',
            title: this.translateSnackBar.dublicateMSg,
            showConfirmButton: false,
            timer: 2000
          })
          flag = true;
          break;
        }
      }
    }

    if (!flag) {
      this.validation = this.pressValidation(rowsLength[ind]);

      if (row.priority <= 0) {
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: this.translateSnackBar.zeroMsg,
          showConfirmButton: false,
          timer: 2500
        })
        return;
      }

      if (this.validation) {
        obj = {
          profileId: this.profile.id,
          pressId: row.pressId,
          priority: row.priority,
          channels: row.channels,
          speed: row.speed,
          alloyFamily: row.alloyFamily,
          extrusionSpeed: row.extrusionSpeed,
          billetTemperature: row.billetTemperature,
          dieTemperature: row.dieTemperature,
        }

        if(row.id) {
          obj.id = row.id;
          if( row.maxLengthPress === 0 ) { row.maxLengthPress = null; }
          url = this.profilesService.updatePress(row);
        } else {
          url = this.profilesService.createPress(obj);
        }

        url.subscribe(data => {
          this.getProfilesByPress();
          this.blockUI.stop();
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: this.translateSnackBar.saveMsg,
            showConfirmButton: false,
            timer: 2000
          })
        }, (error) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'warning',
              title: error.status == 304 ? this.translateSnackBar.makeChange : error.status == 400 ? this.translateSnackBar.errorPriority : 'Error',
              showConfirmButton: false,
              timer: 2000
            })
            this.blockUI.stop();
          }
        );

      } else {
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: this.translateSnackBar.fillAllRowsMsg,
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }

  deleteRowsPress(rowsLength, row, ind) {
    console.log("delete row", rowsLength, ind);
    this.editPress[ind] = false;
    this.profilesService.deletePress(row.id).subscribe(data => {
      this.getProfilesByPress();
      this.blockUI.stop();
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
        this.blockUI.stop();
      }
    );
  }

  sumCut() {
    this.createProfileForm.controls.section.setValue(Math.round(this.createProfileForm.controls.grM.value / 2.7))
  }

  closeModal(): void {
    this.passEntry.emit(false);
    this.activeModal.dismiss();
  }
}
