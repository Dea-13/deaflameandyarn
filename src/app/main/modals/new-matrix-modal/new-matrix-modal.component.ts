import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatrixService } from '../../../@core/services/matrix.service';
import { NewProfileModalComponent } from '../../modals/new-profile-modal/new-profile-modal.component';
import Swal from 'sweetalert2';

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
  public statusArr: Array<any> = [];
  public profileArr: Array<any> = [];
  public channelsArr: Array<any> = [];
  public oporaArr: Array<any> = [];
  public typeArr: Array<any> = [];
  public containerArr: Array<any> = [];
  public clientNameArr: Array<any> = [];
  public producerArr: Array<any> = [];
  public correctorArr: Array<any> = [];
  public matrologistArr: Array<any> = [];
  public pressArr: Array<any> = [];
  public bolster1: Array<any> = [];
  public bolster2: Array<any> = [];
  public language: string;
  public dataOrder: string = '';
  public dataConfirmation: string = '';
  public dataExpedition: string = '';
  public inUseFrom: string = '';
  public isEditableRowsPress = {};
  public isEditableRowsEnd = {};
  public validation: boolean;

  public orderDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  profilesByPress: Array<any> = [];
  profilesEnds: Array<any> = [];
  alloyArr: Array<any> = [];

  constructor(
    private matrixService: MatrixService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  ngOnInit(): void {
    false;
    this.matrix = this.matrixItem.data;
    this.createMatrixForm = this.formBuilder.group({
      profile: ['', Validators.required],
      matrix: ['', Validators.required],
      status: ['', Validators.required],
      channels: ['', Validators.required],
      holder: ['', Validators.required],
      oporenPrysten: ['', Validators.required],
      support: ['', Validators.required],
      pressWasher: ['', Validators.required],
      type: ['', Validators.required],
      anodizingQuality: ['', Validators.required],
      container: ['', Validators.required],
      matrixComplect: ['', Validators.required],
      tulling1: ['', Validators.required],
      tulling2: ['', Validators.required],
      dataOrder: ['', Validators.required],
      dataConfirmation: ['', Validators.required],
      dataExpedition: ['', Validators.required],
      inUseFrom: ['', Validators.required],
      client: ['', Validators.required],
      maker: ['', Validators.required],
      applicant: ['', Validators.required],
      matricologist: ['', Validators.required],
      price: ['', Validators.required],
      dieID: ['', Validators.required],
      grM: ['', Validators.required],
      requiredTest: ['', Validators.required],
      price_Inv: ['', Validators.required],
      primaryResource: ['', Validators.required],
      altResource1: ['', Validators.required],
      altResource2: ['', Validators.required],
      storageGroup: ['', Validators.required],
      storageFreePlace: ['', Validators.required],
      remarks: ['', Validators.required],
      usageType: ['', Validators.required],
      notes: ['', Validators.required],
      scrapReason: ['', Validators.required],
      reasonForPurchase: ['', Validators.required],
      reasonForPurchaseOther: ['', Validators.required],
    });

    if (this.matrix.id) {
      this.createMatrixForm = this.formBuilder.group({
        profile: this.matrix.profile,
        matrix: this.matrix.matrix,
        status: this.matrix.status,
        channels: this.matrix.channels,
        holder: this.matrix.holder,
        oporenPrysten: this.matrix.oporenPrysten,
        support: this.matrix.support,
        pressWasher: this.matrix.pressWasher,
        type: this.matrix.type,
        anodizingQuality: this.matrix.anodizingQuality,
        container: this.matrix.container,
        matrixComplect: this.matrix.matrixComplect,
        tulling1: this.matrix.tulling1,
        tulling2: this.matrix.tulling2,
        dataOrder: this.matrix.dataOrder,
        dataConfirmation: this.matrix.dataConfirmation,
        dataExpedition: this.matrix.dataExpedition,
        inUseFrom: this.matrix.inUseFrom,
        client: this.matrix.client,
        maker: this.matrix.maker,
        applicant: this.matrix.applicant,
        matricologist: this.matrix.matricologist,
        price: this.matrix.price,
        dieID: this.matrix.dieID,
        grM: this.matrix.grM,
        requiredTest: this.matrix.requiredTest,
        price_Inv: this.matrix.price_Inv,
        primaryResource: this.matrix.primaryResource,
        altResource1: this.matrix.altResource1,
        altResource2: this.matrix.altResource2,
        storageGroup: this.matrix.storageGroup,
        storageFreePlace: this.matrix.storageFreePlace,
        remarks: this.matrix.remarks,
        usageType: this.matrix.use,
        notes: this.matrix.notes,
        scrapReason: this.matrix.scrapReason,
        reasonForPurchase: this.matrix.reasonForPurchase,
        reasonForPurchaseOther: this.matrix.reasonForPurchaseOther,
      });
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.translate.get('lang').subscribe((snackBar: string) => {this.language = snackBar;});
    this.getStatus();
    this.getProfile();
    this.getChannels();
    this.getOpora();
    this.getType();
    this.getContainer();
    this.getBolster1();
    this.getBolster2();
    this.getClientName();
    this.getProducer();
    // this.getCorrector();
    this.getMatricologist();
    this.getPress();
    this.getAlloy();
  }

  getProfile() {
    this.loading = true;
    this.matrixService.getProfile().subscribe((data) => {
        this.profileArr = data;
        this.loading = false;
      });
  }

  getMatrix() {
    this.loading = true;
    this.matrixService.getMatrix(this.createMatrixForm.controls.profile.value.name).subscribe((data) => {
      this.createMatrixForm.controls.matrix.setValue(data.name);
      this.loading = false;
    });
  }

  getStatus() {
    this.loading = true;
    this.matrixService.getStatus().subscribe((data) => {
        this.statusArr = data;
        this.loading = false;
      });
  }

  redirectToProfiles(){
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(NewProfileModalComponent, {});
    modalRef.componentInstance.profileItem = { 'data': 'new-modal'};
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {}
    });
  }

  callFunctions(){
    console.log('callFunctions', this.createMatrixForm);
    this.getMatrix();
    this.getProfilesEnds();
    this.getProfilesByPress();
  }

  getChannels() {
    this.loading = true;
    this.matrixService.getChannels(40).subscribe((data) => {
        this.channelsArr = data;
        this.loading = false;
      });
  }

  getOpora() {
    this.loading = true;
    this.matrixService.getOpora().subscribe((data) => {
        this.oporaArr = data;
        this.loading = false;
      });
  }

  getType() {
    this.loading = true;
    this.matrixService.getType().subscribe((data) => {
        this.typeArr = data;
        this.loading = false;
      });
  }

  getContainer() {
    this.loading = true;
    this.matrixService.getContainer().subscribe((data) => {
        this.containerArr = data;
        this.loading = false;
      });
  }

  getBolster1() {
    this.loading = true;
    this.matrixService.getBolster1().subscribe((data) => {
        this.bolster1 = data;
        this.loading = false;
      });
  }

  getBolster2() {
    this.loading = true;
    this.matrixService.getBolster2().subscribe((data) => {
        this.bolster2 = data;
        this.loading = false;
      });
  }

  getClientName() {
    this.loading = true;
    this.matrixService.getClientName().subscribe((data) => {
        this.clientNameArr = data;
        this.loading = false;
      });
  }

  getProducer() {
    this.loading = true;
    this.matrixService.getProducer().subscribe((data) => {
        this.producerArr = data;
        this.loading = false;
      });
  }

  getCorrector() {
    this.loading = true;
    this.matrixService.getCorrector().subscribe((data) => {
        this.correctorArr = data;
        this.loading = false;
      });
  }

  getMatricologist() {
    this.loading = true;
    this.matrixService.getMatricologist().subscribe((data) => {
        this.matrologistArr = data;
        this.loading = false;
      });
  }

  getPress() {
    this.loading = true;
    this.matrixService.getPress().subscribe((data) => {
        this.pressArr = data;
        this.loading = false;
      });
  }

  getAlloy() {
    this.loading = true;
    this.matrixService.getAlloy().subscribe((data) => {
        this.alloyArr = data;
        this.loading = false;
      });
  }

  //////////////////////// TABLE PROFILE BY PRESS


  getProfilesByPress() {
    this.loading = true;
    this.matrixService.getProfilesByPress(this.createMatrixForm.controls.profile.value.id).subscribe((data) => {
      this.columnsFirstTable = data;
      this.loading = false;
    });
  }

  addRowPress(rowsLength) {
    console.log("add row", rowsLength);
    let emptyRow = {
      pressId: "",
      channels: null,
      alloyFamily: "",
      speed: "",
    };
    this.columnsFirstTable.push(emptyRow);
    this.columnsFirstTable = [...this.columnsFirstTable];
  }

  fillPressChannels(row) {
    console.log("fillPressChannels:", row);
    if(row.channels == null){
      row.channels = 2;
    }
  }

  pressValidation(row: any): boolean {
    console.log("invalid++++++:", row);
    if (row.pressId == "") {
      return false;
    } else if (row.channels == null) {
      return false;
    } else if (row.alloyFamily == "") {
      return false;
    } else if (row.speed == "") {
      return false;
    } else {
      return true
    }
  }

  saveRowsPress(rowsLength, row, ind) {
    console.log("save row", rowsLength, row, ind, this.createMatrixForm.controls);
    this.isEditableRowsPress[ind] = false;
    let flag = false;
    let obj;
    for(let i=0; i < this.columnsFirstTable.length; i++){
      if(this.columnsFirstTable[i].id){
        if(!row.id && (this.columnsFirstTable[i].pressId == row.pressId && this.columnsFirstTable[i].alloyFamily == row.alloyFamily)){
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

    if(!flag){
      this.validation = this.pressValidation(rowsLength[ind]);
      if (this.validation) {
        obj = {
          profileId: this.createMatrixForm.controls.profile.value.id,
          pressId: row.pressId,
          priority: row.priority,
          channels: row.channels,
          speed: row.speed,
          kgperHour: row.kgperHour == undefined ? null : row.kgperHour,
          alloyFamily: row.alloyFamily,
          maxLengthPress: row.maxLengthPress == undefined ? null : row.maxLengthPress,
          calculatedProductivity: row.calculatedProductivity == undefined ? true : row.calculatedProductivity,
          firstBilletTemp: row.firstBilletTemp == undefined ? "" : row.firstBilletTemp,
          billetTemp: row.billetTemp == undefined ? "" : row.billetTemp,
          exitTemp: row.exitTemp == undefined ? "" : row.exitTemp,
          pullerForce: row.pullerForce == undefined ? "" : row.pullerForce,
          maxWaitAfterBd: row.maxWaitAfterBd == undefined ? "" : row.maxWaitAfterBd,
          ovAl: row.ovAl == undefined ? "" : row.ovAl,
          coolingExit: row.coolingExit == undefined ? "" : row.coolingExit,
          coolingHotSaw: row.coolingHotSaw == undefined ? "" : row.coolingHotSaw,
          coolingTable: row.coolingTable == undefined ? "" : row.coolingTable,
          streching: row.streching == undefined ? "" : row.streching,
          scrapStart: row.scrapStart == undefined ? null : row.scrapStart,
          scrapEnd: row.scrapEnd == undefined ? null : row.scrapEnd,
          coolingExit2: row.coolingExit2 == undefined ? "" : row.coolingExit2,
          coolingExit3: row.coolingExit3 == undefined ? "" : row.coolingExit3,
          coolingExit4: row.coolingExit4 == undefined ? "" : row.coolingExit4,
          coolingHotSaw2: row.coolingHotSaw2 == undefined ? "" : row.coolingHotSaw2,
          coolingTable2: row.coolingTable2 == undefined ? "" : row.coolingTable2,
          coolingW11: row.coolingW11 == undefined ? "" : row.coolingW11,
          coolingW12: row.coolingW12 == undefined ? "" : row.coolingW12,
          coolingW21: row.coolingW21 == undefined ? "" : row.coolingW21,
          coolingW22: row.coolingW22 == undefined ? "" : row.coolingW22,
          coolingW31: row.coolingW31 == undefined ? "" : row.coolingW31,
          coolingW32: row.coolingW32 == undefined ? "" : row.coolingW32,
          coolingW41: row.coolingW41 == undefined ? "" : row.coolingW41,
          coolingW42: row.coolingW42 == undefined ? "" : row.coolingW42,
          coolingW51: row.coolingW51 == undefined ? "" : row.coolingW51,
          coolingW52: row.coolingW52 == undefined ? "" : row.coolingW52,
          taper: row.taper == undefined ? "" : row.taper,
          created: new Date(), //?????????
          lastModified: new Date(),//?????????
          rowVersion: row.rowVersion == undefined ? ind : row.rowVersion,//?????????
          lastModifiedBy: this.userName,//?????????
        }

        if(row.id){
          obj.id = row.id;
          this.matrixService.updateRowsPress(row).subscribe(matrixService => {
            this.getProfilesByPress();
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: this.translateSnackBar.saveMsg ,
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
        } else {
          this.matrixService.createRowsPress(obj).subscribe(matrixService => {
            this.getProfilesByPress();
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: this.translateSnackBar.saveMsg ,
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

  deleteRowsPress(rowsLength, row, ind) {
    console.log("delete row", rowsLength, ind);
    this.isEditableRowsPress[ind] = false;
    this.matrixService.deleteRowsPress(row.id).subscribe(matrixService => {
      this.getProfilesByPress();
      this.loading = false;
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg ,
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

  //////////////////////// TABLE PROFILE ENDS


  getProfilesEnds() {
    this.loading = true;
    this.matrixService.getProfilesEnds(this.createMatrixForm.controls.profile.value.id).subscribe((data) => {
      this.columnsSecondTable = data;
      this.loading = false;
    });
  }

  addRowEnd(rowsLength) {
    console.log("add row", rowsLength);
    let emptyRow = {
      alloyFamily: "",
      channels: null,
      lengthEnd: null,
      lengthStart: null,
    };
    this.columnsSecondTable.push(emptyRow);
    this.columnsSecondTable = [...this.columnsSecondTable];
  }

  fillEndChannels(row) {
    console.log("fillEndChannels:", row);
    if(row.channels == null){
      row.channels = 2;
    }
  }

  pressEndValidation(row: any): boolean {
    console.log("invalid++++++:", row);
    if (row.alloyFamily == "") {
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

  saveRowsEnd(rowsLength, row, ind) {
    console.log("save row", rowsLength, row, ind);
    this.isEditableRowsEnd[ind] = false;
    let flag = false;
    let obj;
    for (let i = 0; i < this.columnsSecondTable.length; i++) {
      if (this.columnsSecondTable[i].profileId) {
        if (!row.profileId && this.columnsSecondTable[i].alloyFamily == row.alloyFamily) {
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
          profileId: this.createMatrixForm.controls.profile.value.id,
          channels: row.channels,
          alloyFamily: row.alloyFamily,
          lengthStart: row.lengthStart,
          lengthEnd: row.lengthEnd,
          lastModified: new Date(),
          rowVersion: row.rowVersion == undefined ? ind : row.rowVersion,
          lastModifiedBy: this.userName,
        }
        console.log('obj End', obj, row);
        if (row.profileId) {
          this.matrixService.updateRowsEnd(row).subscribe(matrixService => {
            this.getProfilesEnds();
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
        } else {
          this.matrixService.createRowsEnd(obj).subscribe(matrixService => {
            this.getProfilesEnds();
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

  deleteRowsEnd(rowsLength, row, ind) {
    console.log("delete row", rowsLength, ind);
    this.isEditableRowsEnd[ind] = false;
    this.matrixService.deleteRowsEnd(row.profileId).subscribe(matrixService => {
      this.getProfilesByPress();
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
        this.getProfilesByPress();
      }
    );
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
        this.matrixService.createMatrix(obj).subscribe(
          (matrixService) => {
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
