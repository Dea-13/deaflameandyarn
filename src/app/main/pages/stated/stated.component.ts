import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrixService } from '../../../@core/services/matrix.service';
import { NewMatrixModalComponent } from '../../modals/new-matrix-modal/new-matrix-modal.component';
import { Router } from '@angular/router';
import { DetailsDieModalComponent } from '../../modals/details-die-modal/details-die-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-stated',
  templateUrl: './stated.component.html',
  styleUrls: ['./stated.component.scss'],
})
export class StatedComponent implements OnInit {
  // Public
  displayedColumns: string[] = [];
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

  public seldie: string = '';
  public selProfileId: string = '';
  public selPrimeResourceName: string = '';
  public selProducerName: string = '';
  public selCorrector: string = '';
  public selDiameter: string = '';
  public selThickness: string = '';
  public selAlloy: string = '';
  public selTemper: string = '';
  public selBolster1: string = '';
  public selBolster2: string = '';
  public selDieHolder: string = '';
  public selContainer: string = '';
  public selNotes: string = '';
  public selClientName: string = '';
  public selDateOrder: any = '';
  public selPrice: string = '';
  public selPriceInv: string = '';
  public selDateConfirm: any = '';
  public selDateExped: any = '';
  public selDateScrapped: any = '';
  public selChannels: string = '';
  public lastModified: string = '';
  public grM: string = '';
  public indColumn: any;
  public orderBy: number = 0;
  public orderType: number = 1; 


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
      { id: 0, name: 'DieId?' + this.statusId },
      { id: 1, name: 'ProfileId?' + this.statusId },
      { id: 2, name: 'PrimaryResourceName?' },
      { id: 3, name: 'ProducerName?' },
      { id: 4, name: 'CorrectorName?' },
      { id: 5, name: 'Diameter?' + this.statusId },
      { id: 6, name: 'Thickness?' + this.statusId },
      { id: 7, name: 'Alloy?' + this.statusId },
      { id: 8, name: 'Temper?' + this.statusId },
      { id: 9, name: 'BolsterTooling1?' + this.statusId },
      { id: 10, name: 'BolsterTooling2?' + this.statusId },
      { id: 11, name: 'DieHolder?' + this.statusId },
      { id: 12, name: 'Container?' + this.statusId },
      { id: 13, name: 'Notes?' + this.statusId },
      { id: 14, name: 'ClientName?' + this.statusId },
      { id: 15, name: 'DateOrder?' + this.statusId },
      { id: 16, name: 'Price?' + this.statusId },
      { id: 17, name: 'PriceInv?' + this.statusId },
      { id: 18, name: 'DateConfirmation/' + this.statusId },
      { id: 19, name: 'DateExpedition/' + this.statusId },
      { id: 20, name: 'DateScrapped/' + this.statusId },
      { id: 21, name: 'Channels?' + this.statusId },
      { id: 22, name: 'bmwinventorynumber' },
      { id: 23, name: 'dieliveqty' },
    ];
  }

  ngOnInit(): void {
    this.loading = true;
      this.pageChanged(1);
      this.getFilters();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  getRequest() {
    this.loading = true;
    if (this.router.url == '/api/marked'){ this.statusId = 60 };
    if (this.router.url == '/api/no-motion'){ this.statusId = 70 };
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
        this.formatDate(this.selDateOrder), //this.selDateOrder,
        this.selPrice,
        this.selPriceInv,
        this.formatDate(this.selDateConfirm),
        this.formatDate(this.selDateExped),
        this.formatDate(this.selDateScrapped),
        this.selChannels,
        this.grM,
        this.lastModified,
        this.bmwinventorynumber,
        this.dieLiveQty,
        this.orderType,
        this.orderType
      )
      .subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.loading = false;
      });
  }

  getFilters() {
    this.loading = true;
    for (let i = 0; i < this.urls.length; i++) {
      this.matrixService.getStatusFilters(this.urls[i].name, this.statusId, this.seldie, this.selProfileId, this.selPrimeResourceName, this.selProducerName, this.selCorrector, this.selDiameter, this.selThickness, this.selAlloy, this.selTemper, this.selBolster1, this.selBolster2, this.selDieHolder, this.selContainer, this.selNotes, this.selClientName, this.selDateOrder, this.selPrice, this.selPriceInv, this.selDateConfirm, this.selDateExped, this.selDateScrapped, this.selChannels, this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0: { this.dieArr = data; }
            break;
          case 1: { this.profileIdArr = data; }
            break;
          case 2: { this.primeResourceNameArr = data; }
            break;
          case 3: { this.producerNameArr = data; }
            break;
          case 4: { this.correctorArr = data; }
            break;
          case 5: { this.diameterArr = data; }
            break;
          case 6: { this.thicknessArr = data; }
            break;
          case 7: { this.alloyArr = data; }
            break;
          case 8: { this.temperArr = data; }
            break;
          case 9: { this.bolster1Arr = data; }
            break;
          case 10: { this.bolster2Arr = data; }
            break;
          case 11: { this.dieHolderArr = data; }
            break;
          case 12: { this.containerArr = data; }
            break;
          case 13: { this.notesArr = data; }
            break;
          case 14: { this.clientNameArr = data; }
            break;
          case 15: { this.dateOrderArr = data; }
            break;
          case 16: { this.priceArr = data; }
            break;
          case 17: { this.priceInvArr = data; }
            break;
          case 18: { this.dateConfirmArr = data; }
            break;
          case 19: { this.dateExpedArr = data; }
            break;
          case 20: { this.dateScrappedArr = data; }
            break;
          case 21: { this.channelsArr = data; }
            break;
          case 22: { this.bmwNumberArr = data; }
            break;
          case 23: { this.dieLifeArr = data; }
            break;
        }
        this.loading = false;
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
    console.log("formatDate", date[0])
    if(date){
      let returnDate;
      returnDate = moment(date[0]).format("YYYY-MM-DD HH:mm:ss")
      return returnDate;
    } else {
      return '';
    }
  }

  clearDate(type){
    if(type == 'order'){
      this.selDateOrder = '';
    }
    if(type == 'confirm'){
      this.selDateConfirm = '';
    }
    if(type == 'expedition'){
      this.selDateExped = '';
    }
    if(type == 'scrap'){
      this.selDateScrapped = '';
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
}
