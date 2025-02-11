import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatrixService } from '../../../@core/services/matrix.service';
import { GenerateTestModalComponent } from '../generate-test-modal/generate-test-modal.component';
import { NewMatrixModalComponent } from '../new-matrix-modal/new-matrix-modal.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ExtrusionModalComponent } from '../../pages/extrusion-modal/extrusion-modal.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-details-die-modal',
  templateUrl: './details-die-modal.component.html',
  styleUrls: ['./details-die-modal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetailsDieModalComponent implements OnInit {

  @BlockUI('block-die-modal') blockUI: NgBlockUI;
  @Input() public dieItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  displayedColumnsComments: string[] = ['star', 'comment', 'cuser', 'ctime'];
  displayedColumnsFiles: string[] = ['cuser', 'ctime', 'files', 'star'];
  displayedColumnsProduction: string[] = [
    'pullerSpeed', 'billetTemperature', 'exitTemperature',
    'dieStatus', 'lengthFinalPiece', 'kgnet',
    'kggross', 'modifiedOn', 'batchId',
    'firstBilletCounter', 'lastBilletcounter', 'billetMaterial',
    'productionOrder', 'billetPcs', 'extrusionLength',
    'piecesExtrusion', 'die', 'prodOrderQty',
    'remarks', 'remarksQc', 'startTime',
    'postingDate', 'lengthSeconds', 'alloy',
     'numberOfEmployees', 'workstation',
    'resource', 'orderAlloy',
    'matrix', 'profile', 'length',
    'temper', 'salesOrder', 'salesOrderItem',
    'customerName',  'computerName',
    'remainingQty', 'color'
  ];
  displayedColumnsMovements: string[] = ['resourceIn', 'resourceOut', 'movementDateTime', 'notes', 'empName', 'computerName'];
  columnsToDisplay: string[] = ['resourceName'];
  expandedElement: [] | null;

  public urls = [
    { id: 0, name: 'ResourceIn' },
    { id: 1, name: 'ResourceOut' },
    { id: 2, name: 'KgProduced' },
    { id: 3, name: 'ComputerName' },
  ];

  public translateSnackBar: any;
  public image: any = { 'name': '' };
  public active = 1;
  public activeId = 6;
  public dieRow: any;
  public extrusion: Array<any> = [];
  public movements: Array<any> = [];
  public resourceName: string = '';
  public emptyDataHeader: boolean = false;
  public header: any;
  public fullScr: boolean = false;

  public arrFilters: any = [];
  public refreshed: Date;
  public orderBy: number = 3;
  public orderType: number = 0;
  public indColumn: any;
  public userName: any;
  public dieInfo: any = {};
  public arrResource: Array<any> = [];
  public commentsArr: Array<any> = [];
  public filesArr: Array<any> = [];
  public filesUpload: Array<any> = [];
  public modalOption: NgbModalOptions = {};
  public reportData: any;
  public reportFiles: any;
  public reportDossier: any;

  constructor(
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private matrixService: MatrixService,
    private modalService: NgbModal,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      console.log('snackBar', snackBar);
      this.translateSnackBar = snackBar;
    });
    this.userName = JSON.parse(localStorage.getItem('_currentUser')).userName;
    this.arrFilters = [
      {id: 0, ind: 0, url: 'ResourceIn', name: this.translateSnackBar.resourceIn, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 1, ind: 1, url: 'ResourceOut', name: this.translateSnackBar.resourceOut, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 2, ind: 2, url: 'KgProduced', name: this.translateSnackBar.kgProduced, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 3, ind: 3, url: 'ComputerName', name: this.translateSnackBar.workstation, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    ];
   }

  ngOnInit(): void {
    this.dieRow = this.dieItem.data;
    console.log("this.dieRow", this.dieRow);
    this.getExtrusion();
    this.getImage();
    this.getMovements();
    this.getHeaderDetails();
    this.getFilters(this.urls.length, 'init');
    this.getDieInfo();
    this.getResourceTable();
    this.getComments();
    this.getFiles();
    this.getReport();
  }

  fullScreen(){
    this.fullScr == false ? this.fullScr = true : this.fullScr = false;
    console.log('this.fullScr', this.fullScr)
  }

  getExtrusion() {
    this.blockUI.start('Loading...');
    this.matrixService.getExtrusion(this.dieRow.id).subscribe(data => {
      console.log("getExtrusion", data);
      this.extrusion = data;
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getResourceTable() {
    this.blockUI.start('Loading...');
    this.matrixService.getResourceTable(this.dieRow.id).subscribe(data => {
      console.log("getResourceTable", data);
      this.arrResource = data;
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getComments() {
    this.blockUI.start('Loading...');
    this.matrixService.getComments(this.dieRow.id).subscribe(data => {
      console.log("getComments", data);
      this.commentsArr = data;
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getFiles() {
    this.blockUI.start('Loading...');
    this.matrixService.getFiles(this.dieRow.id).subscribe(data => {
      console.log("getFiles", data);
      this.filesArr = data;
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getImage() {
    this.blockUI.start('Loading...');
    this.matrixService.getImage(this.dieRow.profile).subscribe(data => {
      console.log("getImage", data);
      this.image = data;
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getMovements() {
    this.blockUI.start('Loading...');
    this.matrixService.getMovements(
      this.dieRow.id,
      this.orderType,
      this.orderBy,
      this.dieRow.dieId,
      this.arrFilters[0].model,
      this.arrFilters[1].model,
      this.arrFilters[2].model,
      this.arrFilters[3].model,
      this.userName
    ).subscribe(data => {
      console.log("getMovements", data);
      this.movements = data;
      this.blockUI.stop();
    }), error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    };
  }

  getDieInfo() {
    this.blockUI.start('Loading...');
    this.matrixService.getDieInfo(this.dieRow.id).subscribe(data => {
      console.log("getDieInfo", data);
      this.dieInfo = data;
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getHeaderDetails() {
    this.blockUI.start('Loading...');
    this.matrixService.getHeaderDetails(this.dieRow.id).subscribe(data => {
      console.log("getHeaderDetails", data);
      this.header = data;
      this.resourceName = this.resourceName.concat(data.ResourceName).concat("(").concat(data.TotalUsed).concat(")").concat(", ");
      this.blockUI.stop();
    }, error => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: 'Error',
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    });
  }

  getExtrusionData(row){
    console.log("getExtrusionData", row);
    this.matrixService.getExtrusionData(row.batchId, row.resourceId).subscribe(data => {
      console.log("getExtrusionData", data);
      if(data != null) {
        const modalRef = this.modalService.open(ExtrusionModalComponent, {});
        modalRef.componentInstance.extrItem = { 'data': data };
      } else {
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: this.translateSnackBar.msgEmpty,
          showConfirmButton: false,
          timer: 2000
        })
      }
      this.blockUI.stop();
    }, error=>{
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.msgEmpty,
        showConfirmButton: false,
        timer: 2000
      })
    });
  }

  editForm(){
    const modalRef = this.modalService.open(NewMatrixModalComponent, {});
    modalRef.componentInstance.matrixItem = { 'data': this.dieRow, 'redirect': true };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getMovements();
      }
    });
  }

  generateTest(){
    console.log('generateTest',this.dieRow );
    const modalRef = this.modalService.open(GenerateTestModalComponent, {});
    modalRef.componentInstance.testItem = { 'dieId': this.dieRow.dieId };
  }

  sortType(orderType, ind) {
    console.log('sortType', orderType)
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.getMovements();
  }

  getFilters(ind, action) {
    console.log('getFilters', this.arrFilters);
    let count = 0;
    for (let i = 0; i < this.urls.length; i++) {
      if(ind != this.urls[i].id) {
        let array = [];
        count++;
        this.matrixService.getMovementsMatrix(
          this.urls[i].name,
          this.dieRow.id,
          this.dieRow.dieId,
          this.arrFilters[0].model,
          this.arrFilters[1].model,
          this.arrFilters[2].model,
          this.arrFilters[3].model,
          this.userName
        ).subscribe((data) => {
          if(action == 'init' && this.urls[i].id == i) {
            for(let l=0; l < data.length; l++) {
              data[l].checked = false;
              if(l <= 20) { array.push(data[l]) }
            }
            // console.log('===============>>>>>>>>>>', this.arrFilters)
            for(let j=0; j < this.arrFilters.length; j++) {
              // console.log('===============>>>>>>>>>>', this.urls[i].name, this.arrFilters[j].url)
              if(this.urls[i].name == this.arrFilters[j].url) {
                this.arrFilters[j].filter = array;
                this.arrFilters[j].fullFilter = data;
                this.arrFilters[j].temp = data;
                this.arrFilters[j].selectAll = false;
                this.arrFilters[j].disableScroll = false;
                this.arrFilters[j].searchFilterConf= '';
                this.arrFilters[j].model= '';
              }
            }
          } else {
            for (let j = 0; j < this.arrFilters.length; j++) {
              // console.log('data 1=>', data, this.arrFilters, i);
              if (this.arrFilters[j].ind == i) {
                for (let l = 0; l < data.length; l++) {
                  // console.log('data 2=>', data, this.arrFilters[j].filter, j);
                   for (let k = 0; k < this.arrFilters[j].filter.length; k++){
                    // console.log('data 3=>', data, this.arrFilters[j].filter[k], k,);
                    if (this.arrFilters[j].filter[k].checked == true && this.arrFilters[j].filter[k].name == data[l].name) {
                      data[l].checked = true;
                    }
                  }
                }
                for(let l=0; l < data.length; l++) {
                  if(l <= 20) { array.push(data[l]) }
                }
                this.arrFilters[j].filter = array;
                this.arrFilters[j].fullFilter = data;
                this.arrFilters[j].temp = data;
                this.arrFilters[j].disableScroll = false;
                this.arrFilters[j].searchFilterConf= '';
              }
            }
          }
        }, error => {
          for(let j=0; j < this.arrFilters.length; j++) {
            // console.log('error===>', error, this.urls[i].name, this.arrFilters[j].url);
            // console.log('===============>>>>>>>>>>', this.urls[i].name, this.arrFilters[j].url)
            if(this.urls[i].name == this.arrFilters[j].url) {
              this.arrFilters[j].filter = '';
              this.arrFilters[j].fullFilter = '';
              this.arrFilters[j].temp = '';
              this.arrFilters[j].selectAll = false;
              this.arrFilters[j].disableScroll = false;
              this.arrFilters[j].searchFilterConf= '';
              // this.arrFilters[j].model= '';
            }
          }
          this.blockUI.stop();
        });
      }
    }
    setTimeout(() => {
      if(this.urls.length == count) {
        this.arrFilters.sort((a,b)=>a.ind - b.ind)
        console.log('arrFilters', this.arrFilters);
        this.blockUI.stop();
      }
    }, 1000);

  }

  updateAllComplete(column, array, ind) {
    console.log('updateAllComplete', column, array, ind)
    column = array != null && array.every(t => t.checked);
    this.filterColumn(column, array, ind);
  }

  someComplete(column, array, ind) {
    // console.log('someComplete', column, array, ind)
    // if (array.length == 0) {
    //   return false;
    // }
    // return array.filter(t => t.checked).length > 0 && !column;
  }

  searchFilter(event, column, array, tempData, ind) {
    console.log('searchFilter', column, array, tempData, ind);
    // this.blockUI.start('Loading...');
    let fullArray = [];
    const val = event.target.value.toLowerCase().trim();
    const temp = tempData.filter(function (d) {
      return (d.name).toString().toLowerCase().indexOf(val) !== -1 || !val;
    });

    if(event.target.value == '') {
      for(let l=0; l < this.arrFilters[ind].fullFilter.length; l++) {
        if(l <= 20) { fullArray.push(this.arrFilters[ind].fullFilter[l]) }
      }
      this.arrFilters[ind].disableScroll = false;
    } else  {
      this.arrFilters[ind].disableScroll = true;
    }
    console.log('searchFilter=====>',event.target.value == '', fullArray, temp, this.arrFilters[ind].filter.length);
    this.arrFilters[ind].filter = event.target.value == '' ? fullArray : temp;
    // this.blockUI.stop();
    return;
  }

  clearFilter(filter, ind) {
    let fullArray = [];
    for(let l=0; l < filter.length; l++) {
      if(l <= 20) { fullArray.push(filter[l]) }
    }
    this.arrFilters[ind].searchFilterConf = '';
    this.arrFilters[ind].filter = fullArray;
    this.arrFilters[ind].disableScroll = false;
  }

  setAll(checked: boolean, column, array, ind) {
    console.log('setAll', checked, column, array, ind);
    column = checked;
    if (array.length == 0) {
      return;
    }
    array.forEach(t => (t.checked = checked));
    this.filterColumn(column, array, ind);
  }

  filterColumn(column, array, ind) {
    console.log('filterColumn', column, array)
    let selected = [];
    this.refreshed = new Date();
    for(let i=0; i < array.length; i++) {
      if(array[i].checked == true) {
        if(array[i].id != 27) {
          selected.push(array[i].name);
        } else {
          selected.push(array[i].model);
        }
      }
      this.arrFilters[ind].model = selected;
    }

    this.getFilters(ind, 'edit');
    this.getMovements();
  }

  onScroll(column, array, ind) {
    console.log('onScroll', column, array, ind, this.arrFilters[ind].filter.length, this.arrFilters[ind].fullFilter.length)
    let length = this.arrFilters[ind].filter.length;
    if(this.arrFilters[ind].filter.length <= this.arrFilters[ind].fullFilter.length && !this.arrFilters[ind].disableScroll){
      for(let i=length; i < length+20; i++) {
        console.log('this.arrFilters[ind].fullFilter[i]', this.arrFilters[ind].fullFilter[i]);
        if(this.arrFilters[ind].fullFilter[i] != undefined) {
          this.arrFilters[ind].filter.push(this.arrFilters[ind].fullFilter[i]);
        }
      }
    }
  }

  closeModal(): void {
    this.passEntry.emit(false);
    this.activeModal.dismiss();
  }

  clearAll() {
    this.orderBy = 0;
    this.orderType = 1;
    for(let i=0; i < this.arrFilters.length; i++) {
      this.arrFilters[i].model= '';
    }
    this.getMovements();
    this.getFilters(this.urls.length, 'init');
  }

  createRecipe() {
    console.log('createRecipe');
    let comment;
    Swal.fire({
      title: this.translateSnackBar.comment,
      html:'<input id="swal-new-comment" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: this.translateSnackBar.save,
      cancelButtonText: this.translateSnackBar.close,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      preConfirm: function (recipe) {
        console.log('preConfirm', recipe);
        if(!document.getElementById('swal-new-comment')['value']) {
          Swal.showValidationMessage('No data!');
        } else {
          return comment = document.getElementById('swal-new-comment')['value'];
        }
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      }
    }).then( (result)=> {
      if (result.isConfirmed) {
        this.blockUI.start('Loading...');
        let obj = {
          'dieId' : this.dieRow.id,
          'comment' : comment,
          'cuser' : this.userName,
          'ctime' : new Date()
        }
        this.matrixService.createComment(obj).subscribe(recipeService => {
          this.getComments();
          Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.saveMsg, showConfirmButton: false, timer: 2000 })
          this.blockUI.stop();
        },(error) => {
            Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.errorMsg, showConfirmButton: false, timer: 2000})
            this.blockUI.stop();
          }
        );
      }
    });
  }

  updateComments(row) {
    console.log('updateRecipe', row, this.translateSnackBar.fillMsg);
    Swal.fire({
      title: this.translateSnackBar.comment,
      html: '<input id="swal-upd-comment" class="swal2-input" value="'+ row.comment +'">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: this.translateSnackBar.save,
      cancelButtonText: this.translateSnackBar.close,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      preConfirm: function (recipe) {
        if(!document.getElementById('swal-upd-comment')['value']) {
          Swal.showValidationMessage('No data!');
        } else {
          return row.comment = document.getElementById('swal-upd-comment')['value'];
        }
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      }
    }).then( (result)=> {
      if (result.isConfirmed) {
        this.blockUI.start('Loading...');
        this.matrixService.updateComment(row).subscribe(recipeService => {
          this.getComments();
          Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.saveMsg, showConfirmButton: false, timer: 2000 })
          this.blockUI.stop();
        },(error) => {
          Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.errorMsg, showConfirmButton: false, timer: 2000})
          this.blockUI.stop();
        });
      }
    });
  }

  openFile(file){
    this.matrixService.getFileId(file.id, file.dieId).subscribe(data => {
      this.matrixService.downloadFile(file.id, file.dieId).subscribe(response => {
        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = file.files;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }, error=> {
        console.log('error', error);
        let blob: Blob = error.text as Blob;
        let a = document.createElement('a');
        a.download = file.files;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
    }, err =>{
      console.log('Error: ', err);
    });
  }


  uploadFile() {
    console.log('uploadFile: ', this.dieRow);
    const modalRef = this.modalService.open(UploadModalComponent, this.modalOption);
    modalRef.componentInstance.uploadItem = { 'dieId': this.dieRow.id};
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      // if (receivedEntry == true) {
        this.getFiles()
      // }
    });
  }

  deleteFile(row){
    console.log('uploadFile: ', row);
    this.matrixService.deleteFile(row.id).subscribe(data => {
      this.toastrService.success(
        this.translateSnackBar.deleteSuccess,
      );
      this.getFiles();
    });
  }

  getReport() {
    this.blockUI.start('Loading...');
    this.matrixService.getReport(this.dieRow.id).subscribe((data) => {
      for(let i=0; i < data.diedosier.length; i++) {
        // data.diedosier[i].sum = 0;
      }
      for(let i=0; i < data.diedosier.length; i++) {
        if(!data.diedosier[i].sum) { data.diedosier[i].sum = 0;}
        // if(i != 0 ) {
          data.diedosier[i].sum = data.diedosier[i === 0 ? 0 : (i-1)].sum + data.diedosier[i].kg;
          console.log('====', data.diedosier[i].kg, data.diedosier[i === 0 ? 0 : (i-1)].sum)
        // }
      }
      this.reportData = data.dieinfo;
      this.reportFiles = data.diefiles[0];
      this.reportDossier = data.diedosier;
      this.blockUI.stop();
    },error => {
      console.log('error', error);
      this.blockUI.stop();
    });
  }

  print(printSectionId: string) {
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open("", "", "width=880,height=800,resizable,scrollbars=yes");
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="./../../../../../src/styles.scss" /></head><body onload="window.print();window.close()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

}

