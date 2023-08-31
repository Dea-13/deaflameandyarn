import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrixService } from '../../../@core/services/matrix.service';
import { NewMatrixModalComponent } from '../../modals/new-matrix-modal/new-matrix-modal.component';
import { Router } from '@angular/router';
import { DetailsDieModalComponent } from '../../modals/details-die-modal/details-die-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-stated',
  templateUrl: './stated.component.html',
  styleUrls: ['./stated.component.scss'],
})
export class StatedComponent implements OnInit {
  // Public
  displayedColumns: string[] = [];
  public size = 13;
  public urls = [];
  public rows = [{}];
  public dieArr: Array<any> = [];
  public profileIdArr: Array<any> = [];
  public primeResourceNameArr: Array<any> = [];
  public producerNameArr: Array<any> = [];
  public correctorArr: Array<any> = [];
  public diameterArr: Array<any> = [];
  public thicknessArr: Array<any> = [];
  public alloyArr: Array<any> = [];
  public temperArr: Array<any> = [];
  public bolster1Arr: Array<any> = [];
  public bolster2Arr: Array<any> = [];
  public dieHolderArr: Array<any> = [];
  public containerArr: Array<any> = [];
  public notesArr: Array<any> = [];
  public clientNameArr: Array<any> = [];
  public dateOrderArr: Array<any> = [];
  public priceArr: Array<any> = [];
  public priceInvArr: Array<any> = [];
  public dateConfirmArr: Array<any> = [];
  public dateExpedArr: Array<any> = [];
  public dateScrappedArr: Array<any> = [];
  public channelsArr: Array<any> = [];

  public seldie: any = [];
  public selProfileId: any = [];
  public selPrimeResourceName: any = [];
  public selProducerName: any = [];
  public selCorrector: any = [];
  public selDiameter: any = [];
  public selThickness: any = [];
  public selAlloy: any = [];
  public selTemper: any = [];
  public selBolster1: any = [];
  public selBolster2: any = [];
  public selDieHolder: any = [];
  public selContainer: any = [];
  public selNotes: any = [];
  public selClientName: any = [];
  public selDateOrder: any = [];
  public selPrice: any = [];
  public selPriceInv: any = [];
  public selDateConfirm: any = [];
  public selDateExped: any = [];
  public selDateScrapped: any = [];
  public selChannels: any = [];
  public lastModified: string = '';
  public grM: string = '';
  public indColumn: any;
  public orderBy: number = 0;
  public orderType: number = 1;

  selDateOrderForm = new FormGroup({
    selDateOrder: new FormControl(null),
  });

  selDateConfirmForm = new FormGroup({
    selDateConfirm: new FormControl(null),
  });

  selDateExpedForm = new FormGroup({
    selDateExped: new FormControl(null),
  });

  selDateScrappedForm = new FormGroup({
    selDateScrapped: new FormControl(null),
  });


  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;
  public languageOptions: any;
  public loading: boolean = false;
  public translateSnackBar: any;
  public statusId: number;

  public orderDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  public confirmDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  public expedDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  public scrappedDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  public bmwinventorynumber: string = '';
  public dieLiveQty: string = '';
  public dieLifeArr: Array<any> = [];
  public bmwNumberArr: Array<any> = [];

  public allMatrix: boolean = false;
  public allProfile: boolean = false;
  public allPress: boolean = false;
  public allManuf: boolean = false;
  public allMatr: boolean = false;
  public allDiameter: boolean = false;
  public allThickness: boolean = false;
  public allAlloy: boolean = false;
  public allTemp: boolean = false;
  public allBols1: boolean = false;
  public allBols2: boolean = false;
  public allHolder: boolean = false;
  public allCont: boolean = false;
  public allNote: boolean = false;
  public allClient: boolean = false;
  public allPrice: boolean = false;
  public allInvPr: boolean = false;
  public allChannels: boolean = false;
  public refreshed: Date;
  public tempDataDie: any = [];
  public tempDataProfile: any = [];
  public tempDataPrimeRes: any = [];
  public tempDataProducer: any = [];
  public tempDataCorrector: any = [];
  public tempDataDiameter: any = [];
  public tempDataThickness: any = [];
  public tempDataAlloy: any = [];
  public tempDataTemper: any = [];
  public tempDataBols1: any = [];
  public tempDataBols2: any = [];
  public tempDataHolder: any = [];
  public tempDataCont: any = [];
  public tempDataNotes: any = [];
  public tempDataClient: any = [];
  public tempDataPrice: any = [];
  public tempDataPrInv: any = [];
  public tempDataChennels: any = [];
  public tempData: any = [];

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) {
    console.log('this.router.url', this.router.url);
    if (this.router.url == '/api/stated') {
      this.statusId = 10;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'bmwinventorynumber', 'dieLiveQty', 'diameter',
        'thickness', 'alloy', 'temper', 'bolsterTooling1', 'bolsterTooling2', 'dieHolder', 'container',
        'notes', 'visibleSides', 'clientName', 'dateOrder', 'countInUse', 'finalNitriding',
        'kgToFianlNitriding', 'kgAfterFianlNitriding'
      ];
    } else if (this.router.url == '/api/confirmed') {
      this.statusId = 20;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'bolsterTooling1', 'bolsterTooling2', 'container',
        'notes', 'clientName', 'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
      ];
    } else if (this.router.url == '/api/dispatched') {
      this.statusId = 30;
      this.displayedColumns = [
        'dieId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'alloy', 'temper', 'bolsterTooling1', 'bolsterTooling2', 'dieHolder', 'container',
        'notes', 'visibleSides', 'clientName', 'dateOrder', 'price', 'price_Inv', 'dateConfirmation', 'dateExpedition',
        'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
      ];
    } else if(this.router.url == '/api/productivity') {
      this.statusId = 40;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction',
        'gr', 'kgSap', 'renewal'
      ];
    } else if (this.router.url == '/api/scrap') {
      this.statusId = 50;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'bolsterTooling1', 'bolsterTooling2', 'notes', 'clientName',
        'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding', 'dateScrapped'
      ];
    } else if (this.router.url == '/api/marked') {
      this.statusId = 40;
      this.displayedColumns = [
        'dieId', 'profileId', 'placeSklad', 'primaryResourceName', 'producerName', 'correctorName', 'diameter',
        'thickness', 'channels', 'clientName', 'totalWeight', 'kgSap', 'markedForTestDateTime',
      ];
    } else if (this.router.url == '/api/no-motion') {
      this.statusId = 40;
      this.displayedColumns = [
        'dieId', 'profileId', 'placeSklad', 'primaryResourceName', 'producerName', 'lastTransaction', 'diameter',
        'thickness', 'clientName', 'productivity', 'renewal'
      ];
    }
    this.urls = [
      { id: 0, name: 'DieId' },
      { id: 1, name: 'ProfileId' },
      { id: 2, name: 'PrimaryResourceName' },
      { id: 3, name: 'ProducerName' },
      { id: 4, name: 'CorrectorName' },
      { id: 5, name: 'Diameter' },
      { id: 6, name: 'Thickness' },
      { id: 7, name: 'Alloy' },
      { id: 8, name: 'Temper' },
      { id: 9, name: 'BolsterTooling1' },
      { id: 10, name: 'BolsterTooling2' },
      { id: 11, name: 'DieHolder' },
      { id: 12, name: 'Container' },
      { id: 13, name: 'Notes' },
      { id: 14, name: 'ClientName' },
      { id: 15, name: 'Price' },
      { id: 16, name: 'PriceInv' },
      { id: 17, name: 'Channels' },
    ];
  }

  ngOnInit(): void {
    this.loading = true;
      this.pageChanged(1);
      this.getFilters();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.getDieLiveQty();
    this.getBmwNumber();
  }

  getRequest() {
    this.loading = true;
    if (this.router.url == '/api/marked'){ this.statusId = 60 };
    if (this.router.url == '/api/no-motion'){ this.statusId = 70 };
    console.log("selDateOrder: ", this.selDateOrderForm);
    this.matrixService.getInformationMatrix(
        this.offset,
        this.limit,
        this.statusId,
        this.seldie,
        this.selProfileId,
        this.selPrimeResourceName,
        this.selProducerName,
        this.selCorrector,
        this.selDiameter,
        this.selThickness,
        this.selAlloy,
        this.selTemper,
        this.selBolster1,
        this.selBolster2,
        this.selDieHolder,
        this.selContainer,
        this.selNotes,
        this.selClientName,
        this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), //this.selDateOrder,
        this.selPrice,
        this.selPriceInv,
        this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value),
        this.formatDate(this.selDateExpedForm.controls.selDateExped.value),
        this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value),
        this.selChannels,
        this.grM,
        this.lastModified,
        this.bmwinventorynumber,
        this.dieLiveQty,
        this.orderType,
        this.orderBy
      )
      .subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.loading = false;
      });
  }

  getFilters() {
    // this.loading = true;
    for (let i = 0; i < this.urls.length; i++) {
      this.matrixService.getStatusFilters(this.urls[i].name, this.statusId, this.seldie, this.selProfileId, this.selPrimeResourceName, this.selProducerName, this.selCorrector, this.selDiameter, this.selThickness, this.selAlloy, this.selTemper, this.selBolster1, this.selBolster2, this.selDieHolder, this.selContainer, this.selNotes, this.selClientName, this.selPrice, this.selPriceInv, this.selChannels).subscribe((data) => {
        for(let i=0; i < data.length; i++) {
          data[i].checked = false;
        }
        switch (this.urls[i].id) {
          case 0: { this.dieArr = data; this.tempDataDie = data; }
            break;
          case 1: { this.profileIdArr = data; this.tempDataProfile = data; }
            break;
          case 2: { this.primeResourceNameArr = data; this.tempDataPrimeRes = data; }
            break;
          case 3: { this.producerNameArr = data; this.tempDataProducer = data; }
            break;
          case 4: { this.correctorArr = data; this.tempDataCorrector = data; }
            break;
          case 5: { this.diameterArr = data; this.tempDataDiameter = data; }
            break;
          case 6: { this.thicknessArr = data; this.tempDataThickness = data; }
            break;
          case 7: { this.alloyArr = data; this.tempDataAlloy = data; }
            break;
          case 8: { this.temperArr = data; this.tempDataTemper = data; }
            break;
          case 9: { this.bolster1Arr = data; this.tempDataBols1 = data; }
            break;
          case 10: { this.bolster2Arr = data; this.tempDataBols2 = data; }
            break;
          case 11: { this.dieHolderArr = data; this.tempDataHolder = data; }
            break;
          case 12: { this.containerArr = data; this.tempDataCont = data; }
            break;
          case 13: { this.notesArr = data; this.tempDataNotes = data; }
            break;
          case 14: { this.clientNameArr = data; this.tempDataClient = data; }
            break;
          case 15: { this.priceArr = data; this.tempDataPrice = data; }
            break;
          case 16: { this.priceInvArr = data; this.tempDataPrInv = data; }
            break;
          case 17: { this.channelsArr = data; this.tempDataChennels = data; }
            break;
        }
        // this.loading = false;
      });
    }
  }

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }

  modalMatrix(row) {
    console.log("new/edit matrix");
    const modalRef = this.modalService.open(NewMatrixModalComponent, {});
    modalRef.componentInstance.matrixItem = { 'data': row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest();
      }
      this.getFilters();
    });
  }

  formatDate(date){
    console.log("formatDate", date)
    if(date){
      let returnDate;
      returnDate = moment(date).format("YYYY-MM-DD")
      return returnDate;
    } else {
      return '';
    }
  }

  clearDate(type){
    if(type == 'order'){
      this.selDateOrderForm.reset();
    }
    if(type == 'confirm'){
      this.selDateConfirmForm.reset();
    }
    if(type == 'expedition'){
      this.selDateExpedForm.reset();
    }
    if(type == 'scrap'){
      this.selDateScrappedForm.reset();
    }
    this.getRequest();
  }

  modalDetailsDie(row) {
    console.log('new/edit modalDetailsDie');
    const modalRef = this.modalService.open(DetailsDieModalComponent, {});
    modalRef.componentInstance.dieItem = { data: row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest();
      }
      this.getFilters();
    });
  }

  sortType(column, orderType, ind) {
    console.log('sortType', column, orderType)
    this.loading = true;
    this.indColumn = ind;
    this.orderBy = ind;
    if (orderType == true) {
      this.orderType = 1;
    } else {
      this.orderType = 0;
    }
    this.getRequest();
  }

  clarAll() {
    this.offset = 0,
    this.limit = 15,
    this.seldie = [];
    this.selProfileId = [];
    this.selPrimeResourceName = [];
    this.selProducerName = [];
    this.selCorrector = [];
    this.selDiameter = [];
    this.selThickness = [];
    this.selAlloy = [];
    this.selTemper = [];
    this.selBolster1 = [];
    this.selBolster2 = [];
    this.selDieHolder = [];
    this.selContainer = [];
    this.selNotes = [];
    this.selClientName = [];
    this.selPrice = [];
    this.selPriceInv = [];
    this.selChannels = [];
    this.orderBy = 0,
    this.orderType = 1;
    this.getRequest();
    this.getFilters();
  }

  getDieLiveQty() {
    this.loading = true;
    this.matrixService.getDieLiveQty().subscribe((data) => {
      this.dieLifeArr = data;
      this.loading = false;
    });
  }

  getBmwNumber(){
    this.loading = true;
    this.matrixService.bmwNumber().subscribe((data) => {
      this.dieLifeArr = data;
      this.loading = false;
    });
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
    const val = event.target.value.toLowerCase();
    const temp = tempData.filter(function (d) {
      return (d.name).toString().toLowerCase().indexOf(val) !== -1 || !val;
    });

    switch (ind) {
      case 0: { this.dieArr = temp; }
        break;
      case 1: { this.profileIdArr = temp; }
        break;
      case 2: { this.primeResourceNameArr = temp; }
        break;
      case 3: { this.producerNameArr = temp; }
        break;
      case 4: { this.correctorArr = temp; }
        break;
      case 5: { this.diameterArr = temp; }
        break;
      case 6: { this.thicknessArr = temp; }
        break;
      case 7: { this.alloyArr = temp; }
        break;
      case 8: { this.temperArr = temp; }
        break;
      case 9: { this.bolster1Arr = temp; }
        break;
      case 10: { this.bolster2Arr = temp; }
        break;
      case 11: { this.dieHolderArr = temp; }
        break;
      case 12: { this.containerArr = temp; }
        break;
      case 13: { this.notesArr = temp; }
        break;
      case 14: { this.clientNameArr = temp;}
        break;
      case 15: { this.priceArr = temp; }
        break;
      case 16: { this.priceInvArr = temp; }
        break;
      case 17: { this.channelsArr = temp; }
        break;
    }
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
        selected.push(array[i].name);
      }
    }
    //
    switch (ind) {
      case 0: { this.seldie = selected; }
        break;
      case 1: { this.selProfileId = selected; }
        break;
      case 2: { this.selPrimeResourceName = selected; }
        break;
      case 3: { this.selProducerName = selected; }
        break;
      case 4: { this.selCorrector = selected; }
        break;
      case 5: { this.selDiameter = selected; }
        break;
      case 6: { this.selThickness = selected; }
        break;
      case 7: { this.selAlloy = selected; }
        break;
      case 8: { this.selTemper = selected; }
        break;
      case 9: { this.selBolster1 = selected; }
        break;
      case 10: { this.selBolster2 = selected; }
        break;
      case 11: { this.selDieHolder = selected; }
        break;
      case 12: { this.selContainer = selected; }
        break;
      case 13: { this.selNotes = selected; }
        break;
      case 14: { this.selClientName = selected; }
        break;
      case 15: { this.selPrice = selected; }
        break;
      case 16: { this.selPriceInv = selected; }
        break;
      case 17: { this.selChannels = selected; }
        break;
    }

    this.pageChanged(1);
  }

}
