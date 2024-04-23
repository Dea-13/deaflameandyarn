import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrixService } from '../../../@core/services/matrix.service';
import { NewMatrixModalComponent } from '../../modals/new-matrix-modal/new-matrix-modal.component';
import { Router } from '@angular/router';
import { DetailsDieModalComponent } from '../../modals/details-die-modal/details-die-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-stated',
  templateUrl: './stated.component.html',
  styleUrls: ['./stated.component.scss'],
})
export class StatedComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = [];
  public size = 13;
  public urls = [];
  public rows = [{}];
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

  public refreshed: Date;
  public tempData: any = [];
  public arrFilters: any = [];
  public keyword: string = '';
  public count: number = 0;
  public countTable: number = 0;;

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) {
    console.log('this.router.url', this.router.url);

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    if (this.router.url == '/api/stated') {
      this.statusId = 10;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'bmwinventorynumber', 'dieLiveQty', 'diameter',
        'thickness', 'alloy', 'temper', 'bolsterTooling1', 'bolsterTooling2', 'dieHolder', 'container',
        'notes', 'visibleSides', 'clientName', 'dateOrder'
      ];
      // , 'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'Diameter' },
        { id: 4, name: 'Thickness' },
        { id: 5, name: 'Alloy' },
        { id: 6, name: 'Temper' },
        { id: 7, name: 'BolsterTooling1' },
        { id: 8, name: 'BolsterTooling2' },
        { id: 9, name: 'DieHolder' },
        { id: 10, name: 'Container' },
        { id: 11, name: 'Notes' },
        { id: 12, name: 'ClientName' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Alloy', name: this.translateSnackBar.alloy, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'Temper', name: this.translateSnackBar.tempering, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'BolsterTooling1', name: this.translateSnackBar.bolster1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 8, ind: 8, url: 'BolsterTooling2', name: this.translateSnackBar.bolster2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 9, ind: 9, url: 'DieHolder', name: this.translateSnackBar.dieHolder, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 10, ind: 10, url: 'Container', name: this.translateSnackBar.container, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 11, ind: 11, url: 'Notes', name: this.translateSnackBar.noteRequest, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 12, ind: 12, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if (this.router.url == '/api/confirmed') {
      this.statusId = 20;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'bolsterTooling1', 'bolsterTooling2', 'container',
        'notes', 'clientName', 'countInUse'
      ];
      // , 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'Diameter' },
        { id: 4, name: 'Thickness' },
        { id: 5, name: 'BolsterTooling1' },
        { id: 6, name: 'BolsterTooling2' },
        { id: 7, name: 'Container' },
        { id: 8, name: 'ClientName' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'BolsterTooling1', name: this.translateSnackBar.bolster1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'BolsterTooling2', name: this.translateSnackBar.bolster2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'Container', name: this.translateSnackBar.container, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 8, ind: 8, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if (this.router.url == '/api/shipped') {
      this.statusId = 30;
      this.displayedColumns = [
        'dieId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'alloy', 'temper', 'bolsterTooling1', 'bolsterTooling2', 'dieHolder', 'container',
        'notes', 'visibleSides', 'clientName', 'dateOrder', 'price', 'price_Inv', 'dateConfirmation', 'dateExpedition'
      ];
      // , 'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'PrimaryResourceName' },
        { id: 2, name: 'Diameter' },
        { id: 3, name: 'Thickness' },
        { id: 4, name: 'Alloy' },
        { id: 5, name: 'Temper' },
        { id: 6, name: 'BolsterTooling1' },
        { id: 7, name: 'BolsterTooling2' },
        { id: 8, name: 'DieHolder' },
        { id: 9, name: 'Container' },
        { id: 10, name: 'Notes' },
        { id: 11, name: 'ClientName' },
        { id: 12, name: 'Price' },
        { id: 13, name: 'PriceInv' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Alloy', name: this.translateSnackBar.alloy, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Temper', name: this.translateSnackBar.tempering, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'BolsterTooling1', name: this.translateSnackBar.bolster1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'BolsterTooling2', name: this.translateSnackBar.bolster2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 8, ind: 8, url: 'DieHolder', name: this.translateSnackBar.dieHolder, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 9, ind: 9, url: 'Container', name: this.translateSnackBar.container, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 10, ind: 10, url: 'Notes', name: this.translateSnackBar.noteRequest, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 11, ind: 11, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 12, ind: 12, url: 'Price', name: this.translateSnackBar.price, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 13, ind: 13, url: 'PriceInv', name: this.translateSnackBar.invoicePrice, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if(this.router.url == '/api/productivity') {
      this.statusId = 40;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction',
        'gr', 'renewal'
      ];
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'ProducerName' },
        { id: 4, name: 'Diameter' },
        { id: 5, name: 'Thickness' },
        { id: 6, name: 'ClientName' },
        { id: 7, name: 'Channels' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'ProducerName', name: this.translateSnackBar.manufacturer, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'Channels', name: this.translateSnackBar.channels, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if (this.router.url == '/api/scrap') {
      this.statusId = 50;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'bolsterTooling1', 'bolsterTooling2', 'notes', 'clientName',
        'countInUse', 'dateScrapped'
      ];
      // , 'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'ProducerName' },
        { id: 4, name: 'Diameter' },
        { id: 5, name: 'Thickness' },
        { id: 6, name: 'BolsterTooling1' },
        { id: 7, name: 'BolsterTooling2' },
        { id: 8, name: 'Notes' },
        { id: 9, name: 'ClientName' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'ProducerName', name: this.translateSnackBar.manufacturer, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'BolsterTooling1', name: this.translateSnackBar.bolster1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'BolsterTooling2', name: this.translateSnackBar.bolster2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 8, ind: 8, url: 'Notes', name: this.translateSnackBar.noteRequest, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 9, ind: 9, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if (this.router.url == '/api/marked') {
      this.statusId = 60;
      this.displayedColumns = [
        'dieId', 'profileId', 'placeSklad', 'primaryResourceName', 'producerName', 'correctorName', 'diameter',
        'thickness', 'channels', 'bolsterTooling1', 'bolsterTooling2', 'notes', 'clientName', 'totalWeight', 'markedForTestDateTime',
      ];
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'ProducerName' },
        { id: 4, name: 'CorrectorName' },
        { id: 5, name: 'Diameter' },
        { id: 6, name: 'Thickness' },
        { id: 7, name: 'ClientName' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'ProducerName', name: this.translateSnackBar.manufacturer, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'CorrectorName', name: this.translateSnackBar.matricologist, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if (this.router.url == '/api/no-motion') {
      this.statusId = 40;
      this.displayedColumns = [
        'dieId', 'profileId', 'placeSklad', 'primaryResourceName', 'producerName', 'lastTransaction', 'diameter',
        'thickness', 'clientName', 'productivity', 'renewal'
      ];
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'ProducerName' },
        { id: 4, name: 'Diameter' },
        { id: 5, name: 'Thickness' },
        { id: 6, name: 'ClientName' },
        { id: 7, name: 'Channels' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'ProducerName', name: this.translateSnackBar.manufacturer, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'Channels', name: this.translateSnackBar.channels, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    } else if(this.router.url == '/api/settings-die') {
      this.statusId = 61;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'clientName', 'channels','dateOrder', 'dateConfirmation', 'dateExpedition', 'dateScrapped', 'gr', 'bmwinventorynumber',
        'dieLiveQty'
      ];
      this.urls = [
        { id: 0, name: 'DieId' },
        { id: 1, name: 'ProfileId' },
        { id: 2, name: 'PrimaryResourceName' },
        { id: 3, name: 'ProducerName' },
        { id: 4, name: 'Diameter' },
        { id: 5, name: 'Thickness' },
        { id: 6, name: 'ClientName' },
        { id: 7, name: 'Channels' },
      ];

      this.arrFilters = [
        {id: 0, ind: 0, url: 'DieId', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 1, ind: 1, url: 'ProfileId', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 2, ind: 2, url: 'PrimaryResourceName', name: this.translateSnackBar.press, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 3, ind: 3, url: 'ProducerName', name: this.translateSnackBar.manufacturer, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 4, ind: 4, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 5, ind: 5, url: 'Thickness', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 6, ind: 6, url: 'ClientName', name: this.translateSnackBar.client, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
        {id: 7, ind: 7, url: 'Channels', name: this.translateSnackBar.channels, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      ]
    }
  }

  ngOnInit(): void {
    this.blockUI.start('Loading...');
    this.getFilters(this.urls.length, 'init');
    this.pageChanged(1);
  }

  getRequest() {
    let url;
    this.countTable = 0;
    this.blockUI.start('Loading...');
    if (this.router.url == '/api/marked'){ this.statusId = 60 };
    if (this.router.url == '/api/no-motion'){ this.statusId = 70 };
    console.log("selDateOrder: ", this.selDateOrderForm);
    switch (this.router.url) {
      case '/api/stated': { url = this.matrixService.getRequestStated(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.arrFilters[9].model, this.arrFilters[10].model, this.arrFilters[11].model, this.arrFilters[12].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/confirmed': { url = this.matrixService.getRequestConfirmed(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/shipped': { url = this.matrixService.getRequestDispatched(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.arrFilters[9].model, this.arrFilters[10].model, this.arrFilters[11].model, this.arrFilters[12].model, this.arrFilters[13].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/productivity': { url = this.matrixService.getRequestsProd(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/scrap': { url = this.matrixService.getRequestScrap(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.arrFilters[9].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/marked': { url = this.matrixService.getRequestMarked(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/no-motion': { url = this.matrixService.getRequestMotion(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/settings-die': { url = this.matrixService.getRequestsSettings(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
    }
    url.subscribe((data) => {
      this.rows = data.list;
      this.countTable++;
      this.totalResult = data.total;
      // if(this.urls.length == this.count) {
        this.blockUI.stop();
      // }
    }, error =>{
      this.blockUI.stop();
    });
  }

  getFilters(ind, action) {
    console.log('getFilters', this.arrFilters);
    this.count = 0;
    let url;
    for (let i = 0; i < this.urls.length; i++) {
    switch (this.router.url) {
      case '/api/stated': { url = this.matrixService.getFiltersStated(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.arrFilters[9].model, this.arrFilters[10].model, this.arrFilters[11].model, this.arrFilters[12].model); } break;
      case '/api/confirmed': { url = this.matrixService.getFiltersConfirmed(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model); } break;
      case '/api/shipped': { url = this.matrixService.getFiltersDispatched(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.arrFilters[9].model, this.arrFilters[10].model, this.arrFilters[11].model, this.arrFilters[12].model, this.arrFilters[13].model); } break;
      case '/api/productivity': { url = this.matrixService.getFiltersProd(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/scrap': { url = this.matrixService.getFiltersScrap(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.arrFilters[9].model); } break;
      case '/api/marked': { url = this.matrixService.getFiltersMarked(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/no-motion': { url = this.matrixService.getFiltersMotion(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/settings-die': { url = this.matrixService.getFiltersSettings(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
    }
      if(ind != this.urls[i].id) {
        let array = [];
        url.subscribe((data) => {
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
            // console.log('data 4=>', data);
          }
          this.count++;
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
          this.count++;
        });
      }
    }
    setTimeout(() => {
      if(this.urls.length == this.count && this.countTable == 1) {
        this.arrFilters.sort((a,b)=>a.ind - b.ind)
        console.log('arrFilters', this.arrFilters);
        this.blockUI.stop();
      }
    }, 1000);

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
        this.pageChanged(1);
      }
      this.getFilters(this.urls.length, 'init');
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
    this.pageChanged(1);
  }


  modalDetailsDie(row) {
    console.log('new/edit modalDetailsDie');
    const modalRef = this.modalService.open(DetailsDieModalComponent, {});
    modalRef.componentInstance.dieItem = { data: row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.pageChanged(1);
      }
      this.getFilters(this.urls.length, 'init');
    });
  }

  sortType(orderType, ind) {
    console.log('sortType', orderType)
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.pageChanged(1);
  }

  clearAll() {
    this.offset = 0;
    this.limit = 15;
    this.orderBy = 0;
    this.orderType = 1;
    for(let i=0; i < this.arrFilters.length; i++) {
      this.arrFilters[i].model= '';
      this.arrFilters[i].selectAll = false;
    }
    this.pageChanged(1);
    this.getFilters(this.urls.length, 'init');
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
        selected.push(array[i].name);
      }
      this.arrFilters[ind].model = selected;
    }

    this.getFilters(ind, 'edit');
    this.pageChanged(1);
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

}
