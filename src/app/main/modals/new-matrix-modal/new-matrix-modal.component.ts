import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public matrix: any = {};
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
  public purchaserArr: Array<any> = [];
  public matrologistArr: Array<any> = [];
  public pressArr: Array<any> = [];
  public bolster1: Array<any> = [];
  public bolster2: Array<any> = [];
  public language: string;
  public dateOrder: Array<any> = [];
  public dateConfirmation: Array<any> = [];
  public dateExpedition: Array<any> = [];
  public inUseFrom: Array<any> = [];
  public matrixComplectArr: Array<any> = [];
  public isEditableRowsPress = {};
  public isEditableRowsEnd = {};
  public validation: boolean;
  public markedForTestDateTime: any = null;

  public orderDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  profilesByPress: Array<any> = [];
  profilesEnds: Array<any> = [];
  alloyArr: Array<any> = [];
  submitStated: boolean = false;
  submitConfirm: boolean = false;
  submitInUse: boolean = false;
  submitBrak: boolean = false;
  submitDispatched: boolean = false;
  submitReclamation: boolean = false;
  submitBlocked: boolean = false;
  submitRepair: boolean = false;
  enableButton: boolean = true;
  redirectModal: any;
  storagePlaceArr: Array<any> = [];

  constructor(
    private matrixService: MatrixService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {
    this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.translate.get('lang').subscribe((snackBar: string) => { this.language = snackBar; });
  }

  ngOnInit(): void {
    console.log("this.matrixItem.data", this.matrixItem.data);
    this.redirectModal = this.matrixItem.redirect;
    this.createMatrixForm = this.formBuilder.group({
      profile: [[]],
      matrix: [''],
      status: [''],
      channels: ['', Validators.required],
      dieHolder: [''],
      oporenPrysten: [false],
      opora: [''],
      Pressshaiba: [''],
      type: [''],
      anodizingQuality: [false],
      container: ['', Validators.required],
      matrixComplect: [''],
      bolsterTooling1: [''],
      bolsterTooling2: [''],
      dateOrder: [[], Validators.required],
      dateConfirmation: [[], Validators.required],
      dateExpedition: [[], Validators.required],
      inUseFrom: [[], Validators.required],
      clientName: [''],
      producer: [''],
      purchaser: [''],
      corrector: [''],
      price: ['', Validators.required],
      dieID: [''],
      grM: ['', Validators.required],
      requiredTest: [''],
      priceInv: [''],
      primaryResource: [, Validators.required],
      altResource1: ['', Validators.required],
      altResource2: ['', Validators.required],
      storageGroup: [''],
      storageFreePlace: [''],
      remarks: [''],
      usageType: [''],
      notes: [''],
      scrapReason: [''],
      reasonForPurchase: [''],
      reasonForPurchaseOther: [''],
      diameter: ['', Validators.required],
      thickness: ['', Validators.required]
    });

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
    this.getPurchaser();
    this.getMatricologist();
    this.getPress();
    this.getAlloy();
    this.getMatricComplect();
    this.getStorage();


    if(this.matrixItem.data.id){
      this.getDieById();
      this.callFunctions();
      this.fillFormValid();
      setTimeout(() => {
        this.getMatricComplectById();
      }, 1000);
      this.createMatrixForm.enable();
      this.createMatrixForm.controls.profile.disable();
      this.createMatrixForm.controls.matrix.disable();
      this.enableButton = false;
    } else {
      this.createMatrixForm.disable();
      this.createMatrixForm.controls.profile.enable();
      this.createMatrixForm.controls.status.enable();
    }
  }

  getDieById(){
    this.loading = true;
    this.matrixService.getDieById(this.matrixItem.data.id).subscribe((data) => {
      this.matrix = data;
      this.dateOrder = [this.matrix.dateOrder];
      this.dateConfirmation =[ this.matrix.dateConfirmation];
      this.dateExpedition = [this.matrix.dateExpedition];
      this.inUseFrom = [this.matrix.inUseFrom];
      this.createMatrixForm = this.formBuilder.group({
        profile: this.matrix.profileId,
        matrix: this.matrix.dieId,
        status: this.matrix.status,
        channels: this.matrix.channels,
        dieHolder: this.matrix.dieHolder,
        oporenPrysten: this.matrix.oporenPrysten,
        opora: this.matrix.opora,
        Pressshaiba: this.matrix.Pressshaiba,
        type: this.matrix.type,
        anodizingQuality: this.matrix.anodizingQuality,
        container: this.matrix.container,
        matrixComplect: this.matrix.matrixComplect,
        bolsterTooling1: this.matrix.bolsterTooling1,
        bolsterTooling2: this.matrix.bolsterTooling2,
        dateOrder: this.dateOrder,
        dateConfirmation: this.dateConfirmation,
        dateExpedition: this.dateExpedition,
        inUseFrom: this.inUseFrom,
        clientName: this.matrix.clientName,
        producer: this.matrix.producer,
        purchaser: this.matrix.purchaser,
        corrector: this.matrix.corrector,
        price: this.matrix.price,
        dieID: this.matrix.dieId,
        grM: this.matrix.grM,
        requiredTest: this.matrix.requiredTest,
        priceInv: this.matrix.priceInv,
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
        diameter:  this.matrix.diameter,
        thickness: this.matrix.thickness
      });
      console.log('EDIT this.createMatrixForm', this.createMatrixForm);
      this.loading = false;
    });
  }

  fillFormValid(){
    this.submitStated = false;
    this.submitConfirm = false;
    this.submitInUse = false;
    this.submitBrak = false;
    this.submitDispatched = false;
    this.submitReclamation = false;
    this.submitBlocked = false;
    this.submitRepair = false;
    console.log('fillFormValid', this.createMatrixForm.controls.profile.value, this.createMatrixForm.controls.matrix.value, this.createMatrixForm.controls.status.value)
    if(this.createMatrixForm.controls.profile.value && this.createMatrixForm.controls.status.value){
      this.createMatrixForm.enable();
      this.createMatrixForm.controls.matrix.disable();
    } else {
      this.createMatrixForm.disable();
      this.createMatrixForm.controls.profile.enable();
      this.createMatrixForm.controls.status.enable();
    }
    setTimeout(() => {
      this.createMatrixForm.controls.dieID.setValue(this.createMatrixForm.controls.matrix.value);
    }, 1000);
    this.createMatrixForm.controls.dieID.disable();
    console.log('this.createMatrixForm+++++', this.createMatrixForm)
    this.createMatrixForm.controls.status.value == 40 ? this.createMatrixForm.controls.requiredTest.enable() : this.createMatrixForm.controls.requiredTest.disable();
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
    this.matrixService.getMatrix(this.createMatrixForm.controls.profile.value.name ? this.createMatrixForm.controls.profile.value.name : this.matrixItem.data.profileId).subscribe((data) => {
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

  redirectToProfiles() {
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(NewProfileModalComponent, {});
    modalRef.componentInstance.profileItem = { 'data': 'new-modal' };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) { }
    });
  }

  callFunctions() {
    console.log('callFunctions', this.createMatrixForm);
    if(this.matrixItem.data == 'new'){
      this.getMatrix();
    }
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

  getPurchaser() {
    this.loading = true;
    this.matrixService.getPurchaser().subscribe((data) => {
      this.purchaserArr = data;
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

  getMatricComplect(){
    this.loading = true;
    this.matrixService.getMatricComplect().subscribe((data) => {
      this.matrixComplectArr = data;
      this.loading = false;
    });
  }

  getStorage(){
    this.loading = true;
    this.matrixService.getStorage().subscribe((data) => {
      this.storagePlaceArr = data;
      this.loading = false;
    });
  }

  getMatricComplectById() {
    this.loading = true;
    let diameter, thickness, resourceId = 0;
    if (this.matrixItem.data == 'new') {
      diameter = this.createMatrixForm.controls.matrixComplect.value.diameter;
      thickness = this.createMatrixForm.controls.matrixComplect.value.thickness;
      resourceId = this.createMatrixForm.controls.matrixComplect.value.resourceId;
    } else {
      diameter = this.createMatrixForm.controls.diameter.value;
      thickness = this.createMatrixForm.controls.thickness.value;
      resourceId = this.createMatrixForm.controls.primaryResource.value;
    }
    this.matrixService.getMatricComplectById(diameter, thickness, resourceId).subscribe((data) => {
      console.log('getMatricComplectById', data);
      this.createMatrixForm.controls.primaryResource.setValue(data.resourceId);
      this.createMatrixForm.controls.diameter.setValue(data.diameter);
      this.createMatrixForm.controls.thickness.setValue(data.thickness);
      this.createMatrixForm.controls.matrixComplect.setValue(data.dimensions.concat(' - ').concat(data.resourceName));
      this.loading = false;
    });
  }

  //////////////////////// TABLE PROFILE BY PRESS


  getProfilesByPress() {
    this.loading = true;
    this.matrixService.getProfilesByPress(this.createMatrixForm.controls.profile.value.id ? this.createMatrixForm.controls.profile.value.id : this.matrixItem.data.profile).subscribe((data) => {
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
    if (row.channels == null) {
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
    for (let i = 0; i < this.columnsFirstTable.length; i++) {
      if (this.columnsFirstTable[i].id) {
        if (!row.id && (this.columnsFirstTable[i].pressId == row.pressId && this.columnsFirstTable[i].alloyFamily == row.alloyFamily)) {
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
          // created: new Date(), //?????????
          lastModified: new Date(),//?????????
          rowVersion: row.rowVersion == undefined ? ind : row.rowVersion,//?????????
          lastModifiedBy: this.userName,//?????????
        }

        if (!row.id) {
          obj.created = new Date();
        }

        if (row.id) {
          obj.id = row.id;
          this.matrixService.updateRowsPress(row).subscribe(matrixService => {
            this.getProfilesByPress();
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
          this.matrixService.createRowsPress(obj).subscribe(matrixService => {
            this.getProfilesByPress();
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

  deleteRowsPress(rowsLength, row, ind) {
    console.log("delete row", rowsLength, ind);
    this.isEditableRowsPress[ind] = false;
    this.matrixService.deleteRowsPress(row.id).subscribe(matrixService => {
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
      }
    );
  }

  //////////////////////// TABLE PROFILE ENDS


  getProfilesEnds() {
    this.loading = true;
    this.matrixService.getProfilesEnds(this.createMatrixForm.controls.profile.value.id ? this.createMatrixForm.controls.profile.value.id : this.matrixItem.data.profile).subscribe((data) => {
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
    if (row.channels == null) {
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
              console.log('ERROR: ', error.status);

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
    console.log("delete row", rowsLength, ind, row);
    this.isEditableRowsEnd[ind] = false;
    this.matrixService.deleteRowsEnd(row.profileId, row.alloyFamily).subscribe(matrixService => {
      this.getProfilesByPress();
      this.getProfilesEnds();
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
        this.getProfilesEnds();
      }
    );
  }

  submitForm() {
    console.log('submitForm', this.createMatrixForm, this.createMatrixForm.controls.profile.value, this.createMatrixForm.controls.matrix.value, this.createMatrixForm.controls.status.value);
    if(this.createMatrixForm.controls.profile.value && this.createMatrixForm.controls.matrix.value && this.createMatrixForm.controls.status.value){
      switch (this.createMatrixForm.controls.status.value) {
        case 10: { this.submitStatedDie(); } break;
        case 20: { this.submitConfirmedDie(); } break;
        case 40: { this.submitInUseDie(); } break;
        case 35: { this.submitReclamationDie(); } break;
        case 37: { this.submitRepairDie(); } break;
        case 50: { this.submitBrakDie(); } break;
        case 32: { this.submitBlockedDie(); } break;
        case 30: { this.submitDispatchedDie(); } break;
      }
    } else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.dieValidMsg,
        showConfirmButton: false,
        timer: 3000
      })
    }

  }

  submitStatedDie(){
    this.submitStated = true;
    if(this.createMatrixForm.controls.anodizingQuality.value && !this.createMatrixForm.invalid){
      Swal.fire({
        title: this.translateSnackBar.statedMsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7367F0',
        cancelButtonColor: '#E42728',
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ml-1'
        }
      }).then((result) => {
        if (result.value) {
          this.sendResponce();
        }
      });
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



  submitBlockedDie(){
    this.submitBlocked = true;
    if(!this.createMatrixForm.invalid){
      this.sendResponce();
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

  submitRepairDie(){
    this.submitRepair = true;
    if(!this.createMatrixForm.invalid){
      this.sendResponce();
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

  submitReclamationDie(){
    this.submitReclamation = true;
    if(!this.createMatrixForm.invalid){
      this.sendResponce();
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

  submitConfirmedDie(){
    this.submitConfirm = true;
    if(!this.createMatrixForm.invalid){
      this.sendResponce();
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

  submitDispatchedDie(){
    this.submitDispatched = true;
    if(!this.createMatrixForm.invalid){
      this.sendResponce();
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

  submitInUseDie(){
    this.submitInUse = true;
    if( this.createMatrixForm.controls.matrixComplect.value && this.createMatrixForm.controls.storageFreePlace.value && !this.createMatrixForm.invalid){
      if(this.createMatrixForm.controls.status.value == 40 && this.createMatrixForm.controls.requiredTest.value == true){
        this.markedForTestDateTime = new Date();
      }
      this.sendResponce();
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

  submitBrakDie(){
    this.submitBrak = true;
    if( this.createMatrixForm.controls.matrixComplect.value){
      Swal.fire({
        title: this.translateSnackBar.brakMsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7367F0',
        cancelButtonColor: '#E42728',
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ml-1'
        }
      }).then((result) => {
        if (result.value) {
          this.sendResponce();
        }
      });
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

  sendResponce() {
    console.log('sendResponce', this.createMatrixForm);
    this.loading = true;
    this.matrix.profile = !this.redirectModal ? this.createMatrixForm.controls.profile.value.id : this.matrix.profile,
    this.matrix.profileId = !this.redirectModal ? this.createMatrixForm.controls.profile.value.name : this.matrix.profileId,
    this.matrix.dieId = this.createMatrixForm.controls.matrix.value,
    this.matrix.status = this.createMatrixForm.controls.status.value,
    this.matrix.channels = this.createMatrixForm.controls.channels.value,
    this.matrix.dieHolder = this.createMatrixForm.controls.dieHolder.value,
    this.matrix.oporenPrysten = this.createMatrixForm.controls.oporenPrysten.value,
    this.matrix.opora = this.createMatrixForm.controls.opora.value,
    this.matrix.Pressshaiba = this.createMatrixForm.controls.Pressshaiba.value,
    this.matrix.type = this.createMatrixForm.controls.type.value,
    this.matrix.anodizingQuality = this.createMatrixForm.controls.anodizingQuality.value,
    this.matrix.container = this.createMatrixForm.controls.container.value,
    this.matrix.matrixComplect = this.createMatrixForm.controls.matrixComplect.value,
    this.matrix.bolsterTooling1 = this.createMatrixForm.controls.bolsterTooling1.value,
    this.matrix.bolsterTooling2 = this.createMatrixForm.controls.bolsterTooling2.value,
    this.matrix.dateOrder = this.createMatrixForm.controls.dateOrder.value.length == 1 ? this.createMatrixForm.controls.dateOrder.value[0] : this.createMatrixForm.controls.dateOrder.value,
    this.matrix.dateConfirmation = this.createMatrixForm.controls.dateConfirmation.value.length == 1 ? this.createMatrixForm.controls.dateConfirmation.value[0] : this.createMatrixForm.controls.dateConfirmation.value,
    this.matrix.dateExpedition = this.createMatrixForm.controls.dateExpedition.value.length == 1 ? this.createMatrixForm.controls.dateExpedition.value[0] : this.createMatrixForm.controls.dateExpedition.value,
    this.matrix.inUseFrom = this.createMatrixForm.controls.inUseFrom.value.length == 1 ? this.createMatrixForm.controls.inUseFrom.value[0] : this.createMatrixForm.controls.inUseFrom.value,
    this.matrix.clientName = this.createMatrixForm.controls.clientName.value,
    this.matrix.producer = this.createMatrixForm.controls.producer.value,
    this.matrix.purchaser = this.createMatrixForm.controls.purchaser.value,
    this.matrix.corrector = this.createMatrixForm.controls.corrector.value,
    this.matrix.price = this.createMatrixForm.controls.price.value,
    // dieID: this.createMatrixForm.controls.dieID.value,
    this.matrix.grM = this.createMatrixForm.controls.grM.value,
    this.matrix.requiredTest = this.createMatrixForm.controls.requiredTest.value,
    this.matrix.priceInv = this.createMatrixForm.controls.priceInv.value,
    this.matrix.primaryResource = this.createMatrixForm.controls.primaryResource.value,
    this.matrix.altResource1 = this.createMatrixForm.controls.altResource1.value,
    this.matrix.altResource2 = this.createMatrixForm.controls.altResource2.value,
    this.matrix.storageGroup = this.createMatrixForm.controls.storageGroup.value,
    this.matrix.storageFreePlace = this.createMatrixForm.controls.storageFreePlace.value,
    this.matrix.remarks = this.createMatrixForm.controls.remarks.value,
    this.matrix.usageType = this.createMatrixForm.controls.usageType.value,
    this.matrix.notes = this.createMatrixForm.controls.notes.value,
    this.matrix.scrapReason = this.createMatrixForm.controls.scrapReason.value,
    this.matrix.reasonForPurchase = this.createMatrixForm.controls.reasonForPurchase.value,
    this.matrix.reasonForPurchaseOther = this.createMatrixForm.controls.reasonForPurchaseOther.value,
    this.matrix.markedForTestDateTime = this.markedForTestDateTime,
    this.matrix.created = this.matrix ? this.matrix.created : new Date(),
    this.matrix.lastModified = new Date(),
    this.matrix.lastModifiedBy = this.userName,
    this.matrix.diameter = this.createMatrixForm.controls.diameter.value;
    this.matrix.thickness = this.createMatrixForm.controls.thickness.value;
    console.log('send', this.matrix);

    if (!this.matrixItem.data.id) {
      this.matrixService.createMatrix(this.matrix).subscribe(matrixService => {
        this.getProfilesEnds();
        this.loading = false;
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg,
          showConfirmButton: false,
          timer: 2000
        });
        this.activeModal.dismiss();
        this.passEntry.emit(true);
      },
        (error) => {
          console.log('error', error);
          Swal.fire({
            position: 'bottom-end',
            icon: 'warning',
            title: error.error,
            showConfirmButton: false,
            timer: 2000
          })
          this.loading = false;
        }
      );
    } else {
      this.matrixService.updateMatrix(this.matrix).subscribe(matrixService => {
        // this.getProfilesEnds();
        this.loading = false;
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg,
          showConfirmButton: false,
          timer: 2000
        })
        this.activeModal.dismiss();
        this.passEntry.emit(true);
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
        }
      );
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
