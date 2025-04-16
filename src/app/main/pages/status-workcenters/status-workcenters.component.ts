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
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-workcenters',
  templateUrl: './status-workcenters.component.html',
  styleUrls: ['./status-workcenters.component.scss']
})
export class StatusWorkcentersComponent implements OnInit {
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
  public limit: number = 100;
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
    private toastrService: ToastrService,
    private router: Router
  ) {
    console.log('this.router.url', this.router.url);

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    if (this.router.url == '/api/press-600') {
      this.statusId = 6;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if (this.router.url == '/api/press-1300') {
      this.statusId = 8;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if (this.router.url == '/api/press-1800') {
      this.statusId = 7;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if (this.router.url == '/api/press-2000') {
      this.statusId = 9;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/press-2500') {
      this.statusId = 22;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if (this.router.url == '/api/storage-dies') {
      this.statusId = 1;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
      // , 'countInUse', 'finalNitriding', 'kgToFianlNitriding', 'kgAfterFianlNitriding'
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
    } else if (this.router.url == '/api/nitriding') {
      this.statusId = 12;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if (this.router.url == '/api/boiling-soda') {
      this.statusId = 10;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/correction-dies') {
      this.statusId = 11;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/correction-turkie') {
      this.statusId = 26;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/press-600-oven') {
      this.statusId = 14;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/press-1300-oven') {
      this.statusId = 16;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/press-1800-oven') {
      this.statusId = 15;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/press-2000-oven') {
      this.statusId = 17;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/press-2500-oven') {
      this.statusId = 23;
      this.displayedColumns = [ 'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter', 'thickness', 'clientName','countInUse', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction','gr', 'renewal' ];
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
    } else if(this.router.url == '/api/wc-blocked-die') {
      this.statusId = 102;
      this.displayedColumns = [
        'dieId', 'profileId', 'primaryResourceName', 'producerName', 'diameter',
        'thickness', 'clientName','countInUse', 'KgNet', 'totalWeight', 'channels', 'placeSklad', 'lastTransaction',
        'gr', 'renewal', 'blockedReason', 'blockedUser', 'blockedTime'
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
    switch (this.router.url) {
      case '/api/press-600': { url = this.matrixService.getPress600WC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-1300': { url = this.matrixService.getPress1300WC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-1800': { url = this.matrixService.getPress1800WC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-2000': { url = this.matrixService.getPress2000WC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-2500': { url = this.matrixService.getPress2500WC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/storage-dies': { url = this.matrixService.getStorageDiesWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/nitriding': { url = this.matrixService.getNitridingWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/boiling-soda': { url = this.matrixService.getBoilingWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/correction-dies': { url = this.matrixService.getCorrectionDiesWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/correction-turkie': { url = this.matrixService.getCorrectionTurkieWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-600-oven': { url = this.matrixService.getPress600OvenWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-1300-oven': { url = this.matrixService.getPress1300OvenWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-1800-oven': { url = this.matrixService.getPress1800OvenWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-2000-oven': { url = this.matrixService.getPress2000OvenWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/press-2500-oven': { url = this.matrixService.getPress2500OvenWC(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
      case '/api/wc-blocked-die': { url = this.matrixService.getBlockedDie(this.offset, this.limit, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy); } break;
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
      case '/api/press-600': { url = this.matrixService.getFiltersPress600WC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-1300': { url = this.matrixService.getFiltersPress1300WC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-1800': { url = this.matrixService.getFiltersPress1800WC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-2000': { url = this.matrixService.getFiltersPress2000WC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-2500': { url = this.matrixService.getFiltersPress2500WC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/storage-dies': { url = this.matrixService.getFiltersStorageDiesWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/nitriding': { url = this.matrixService.getFiltersNitridingWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/boiling-soda': { url = this.matrixService.getFiltersBoilingWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/correction-dies': { url = this.matrixService.getFiltersCorrectionDiesWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/correction-turkie': { url = this.matrixService.getFiltersCorrectionTurkieWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-600-oven': { url = this.matrixService.getFiltersPress600OvenWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-1300-oven': { url = this.matrixService.geFilterstPress1300OvenWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-1800-oven': { url = this.matrixService.getFiltersPress1800OvenWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-2000-oven': { url = this.matrixService.getFiltersPress2000OvenWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/press-2500-oven': { url = this.matrixService.getFiltersPress2500OvenWC(this.urls[i].name, this.keyword, this.statusId, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
      case '/api/wc-blocked-die': { url = this.matrixService.getFiltersWCBlocked(this.urls[i].name, this.keyword, 40, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model); } break;
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
    this.limit = 100;
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
    console.log('filterColumn', column, array, ind)
    let selected = [];
    this.refreshed = new Date();
    for(let i=0; i < array.length; i++) {
      if(array[i].checked == true) {
        selected.push(array[i].name)
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

  exportTable() {
    console.log('exportTable', this.rows);
    if (this.rows.length === 0) {
      Swal.fire({
        title: this.translateSnackBar.invalidMsg,
        icon: 'warning',
        confirmButtonColor: '#7367F0',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'btn btn-primary',
        }
      }).then((result) => { });
      return;
    }
    this.blockUI.start('Loading...');
    this.matrixService.exportTable(this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model, this.arrFilters[3].model, this.arrFilters[4].model, this.arrFilters[5].model, this.arrFilters[6].model, this.arrFilters[7].model, this.arrFilters[8].model, this.formatDate(this.selDateOrderForm.controls.selDateOrder.value), this.formatDate(this.selDateConfirmForm.controls.selDateConfirm.value), this.formatDate(this.selDateExpedForm.controls.selDateExped.value), this.formatDate(this.selDateScrappedForm.controls.selDateScrapped.value), this.grM, this.lastModified, this.bmwinventorynumber, this.dieLiveQty, this.orderType, this.orderBy).subscribe(response => {
      console.log("DATA", response);
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = 'Export';
      a.href = window.URL.createObjectURL(blob);
      a.click();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.exportSuccess ,
        showConfirmButton: false,
        timer: 2000
      }).then((result) => { });
      this.blockUI.stop();
    }, error => {
      let blob: Blob = error.body as Blob;
      let a = document.createElement('a');
      a.download = 'Export';
      a.href = window.URL.createObjectURL(blob);
      a.click();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.exportSuccess ,
        showConfirmButton: false,
        timer: 2000
      }).then((result) => { });
      this.blockUI.stop();
    });
  }

}
