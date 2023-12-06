import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';
import { DieScanModalComponent } from '../../modals/die-scan-modal/die-scan-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../../core/services';
import { constants } from '../../../../environments/constants';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare function pushSerial(scan:string, com:string, manufacturer:string):void;
declare function getSerial():string;
declare function clearSerial():void;

@Component({
  selector: 'app-die-scan-page',
  templateUrl: './die-scan-page.component.html',
  styleUrls: ['./die-scan-page.component.scss']
})
export class DieScanPageComponent implements OnInit {

  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = ['dieId', 'resourceIn', 'resourceOut', 'movementDateTime', 'notes', 'computerName',];
  displayedColumnsDie: string[] = ['dieId','resourceName', 'skladPlace', 'lastTransaction',];
  public translateSnackBar: any;
  public rowsMovements: Array<any> = [];
  public rowsDie: Array<any> = [];

  public dieId: string = '';
  public barCode: string = '';
  public image: any = { name: '' };
  public imageLastMovement: any = { name: '' };
  public lastMovements: Array<any> = [];
  public resource: Array<any> = [];
  public employee: Array<any> = [];
  public resourceIn: number;
  public currentResource: number;
  public productionKg: number;
  public notes: string;
  public emplId: any;
  public directionReporting: number = 1;
  public submitted: boolean;

  public cPage: number = 1;
  public limit: number = 10;
  public offset: number = 0;
  public leastDaysAgo = this.limit * this.cPage;
  public totalResult: number = 0;
  public maxSize = 10;
  public itemsPerPage = 10;

  public urls = [
    { id: 0, name: 'Resource/all/resourcename' },
    { id: 1, name: 'Resource/all/DieId' },
    { id: 2, name: 'Resource/all/storageplace' }
  ];

  public orderBy: number = 0;
  public orderType: number = 1;
  public indColumn: any;

  DEVICE_NAME: string;


  public myInterval: any;
  public comPorts: any = [];
  public zebraCom: string;
  public SCAN_PERIOD = 2000;
  public zebraPort: any;
  public storagePlaceArr: Array<any> = [];
  public dieIdArr: Array<any> = [];
  public resourceNameArr: Array<any> = [];
  public die: string = '';
  public storagePlace: string = '';
  public resourceName: string = '';

  constructor(
    public translate: TranslateService,
    public dieService: DieConfirmationService,
    private modalService: NgbModal,
    public router: Router,
    public toastrService: ToastrService,
    public electronService: ElectronService
  ) {

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      console.log('constants.comport', constants.comport);
      if(constants.comport == 0){
        this.scanPorts()
      } else {
        this.comPorts = JSON.parse(localStorage.getItem('ComPort'));
      }

    } else {
      console.log('Run in browser');
    }

    this.myInterval = setInterval(() => {
      let scanner = getSerial();
      if(scanner){
        this.openedScanZebra(scanner['scan'], scanner['com'], scanner['manufacturer']);
        clearSerial();
      }

    }, 500);

  }

  ngOnInit(): void {
    this.submitted = false;
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.getResource();
    this.getEmployee();
    this.pageChanged(1);
    this.getFilters();
  }

  public scanPorts () {

    this.electronService.serialPort.SerialPort.list().then((ports:any)=>{
      console.log("SerialPort -> ports: ", ports);

      ports.forEach(element => {
        if(element.manufacturer == constants.zebraProductName){
          constants.comport = 1;
          this.zebraCom = element.path;
          this.DEVICE_NAME = element.manufacturer;
          let checkedCom = this.comPorts.filter((item) =>{
            return item.path == element.path
          })

          if(checkedCom.length == 0){
            this.comPorts.push(element);
          }

        }
      });

      this.comPorts = this.comPorts.sort((a, b) => a.path < b.path ? - 1 : Number(a.path > b.path));
      localStorage.setItem('ComPort', JSON.stringify(this.comPorts));
    }).catch((err:any)=>{
      console.log("SerialPort -> err: ", err);
    });

    if(this.zebraCom){
      this.comPorts.forEach(element => {
        this.initPort(element.path, element.manufacturer)
      });

    } else {
      setTimeout(() => { this.scanPorts() }, this.SCAN_PERIOD)
    }
  }

  public initPort (comName: string, manufacturer: string) {
    this.zebraPort = new this.electronService.serialPort.SerialPort({path: comName, baudRate:9600})
    this.zebraPort.on('error', error => this.onError(error, manufacturer))
    this.zebraPort.on('open', () => this.opened(manufacturer))
    this.zebraPort.on('close', () => this.closed(manufacturer))
    this.zebraPort.on('data', data => this.onData(data, comName, manufacturer))
    // console.log('this.zebraPort.isOpen: ', this.zebraPort.isOpen);
    if (!this.zebraPort.isOpen) {
      setInterval(() => {
        if (!this.zebraPort.isOpen) {
          this.zebraPort.open()
        }
      }, 5000)
    }
  }

  onError (error: Error, manufacturer: string) {
    console.error(manufacturer + ' -> ' + error)
    if(error){
      this.toastrService.error(
        'Внимание! Четеца се разкачи.Приложението ще се рестартира след 20 секунди.', '',
        { toastClass: 'toast ngx-toastr', closeButton: false }
      );

      if (this.electronService.isElectron) {
        setTimeout(() => {
          this.electronService.closeWindows()
        },20000);
      }
    }
  }

  opened (manufacturer: string) {
    console.log(manufacturer + ' : Port Opened')
  }

  openedScanZebra(scan, com, manufacturer){
    if(scan.length > 0){
      console.log("openedScanZebra: ", scan, com, manufacturer);
      this.barCode = scan;
    }
  }

  closed (manufacturer: string) {
    console.log(manufacturer + ' : Port Closed')
    this.scanPorts()
  }

  onData (data: Buffer, com: string, manufacturer: string) {
    // console.log('onData=================: ', data, com, manufacturer);
    let tamp = this.parse(data);
    let text = tamp.search(/\r\n/i) >= 0 ?  tamp.split('\r\n')[0] : tamp;
    let scan = text.indexOf('http://') >= 0 ? text.split('http://')[1]: text;
    this.recordScanZebra(scan, com, manufacturer);
  }

  public parse (data: any) {
    let rawStream = Buffer.from(data, 'ascii').toString();
    return rawStream;
  }

  recordScanZebra(scan, com, manufacturer){
    pushSerial(scan, com, manufacturer);
    // this.getBarCodesTable();
    if (scan && scan.toString().length == 7) {
      this.openBarCodeModal(scan);
    }
  }

  getPositionDie(){
    this.blockUI.start('Loading...');
    this.dieService.getPositionDie(
      this.offset,
      this.limit,
      this.orderType,
      this.orderBy,
      this.resourceName,
      this.storagePlace,
      this.die,
    ).subscribe(data => {
      console.log("getPositionDie", data);
      this.rowsDie = data['list'];
      this.totalResult = data['total'];
      this.blockUI.stop();
    });
  }

  getFilters() {
    this.blockUI.start('Loading...');
    for (let i = 0; i < this.urls.length; i++) {
      this.dieService.getFilters(this.urls[i].name).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0: { this.resourceNameArr = data; } break;
          case 1: { this.dieIdArr = data; } break;
          case 2: { this.storagePlaceArr = data; } break;
        }
        this.blockUI.stop();
      });
    }
  }

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getPositionDie();
  }

  getResource() {
    this.dieService.getResource().subscribe(data => {
      console.log("getBarCode", data);
      this.resource = data;
      this.blockUI.stop();
    });
  }

  getEmployee() {
    this.dieService.getEmployee().subscribe(data => {
      console.log("getEmployee", data);
      this.employee = data;
      this.blockUI.stop();
    });
  }

  getImage(row) {
    this.blockUI.start('Loading...');
    this.dieService.getImage(row.profile).subscribe(data => {
      console.log("getImage", data);
      this.image = data;
      this.blockUI.stop();
    });
  }

  getMovements(resourceIn) {
    this.blockUI.start('Loading...');
    this.dieService.getMovements(resourceIn).subscribe(data => {
      console.log("getMovements", data);
      this.rowsMovements = data;
      this.imageLastMovement.name = '';
      this.blockUI.stop();
    });
  }

  getBarCodesTable() {
    if (this.barCode && this.barCode.toString().length == 7) {
      this.openBarCodeModal(this.barCode);
    }
  }

  openBarCodeModal(value) {
    console.log('openBarCodeModal', value);
    const modalRef = this.modalService.open(DieScanModalComponent, {size : 'md'});
    modalRef.componentInstance.dieItem = { 'die': value };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {
        this.getImage(receivedEntry);
        this.currentResource = receivedEntry.resourceIn;
        this.barCode = receivedEntry.dieId;
        console.log('receivedEntry+++++ ', receivedEntry,this.currentResource, this.barCode);
      }
    });
  }

  lastMovementRow(row) {
    console.log('lastMovementRow', row);
    this.blockUI.start('Loading...');
    this.dieService.getImage(row.profile).subscribe(data => {
      console.log("lastMovementRow getImage", data);
      this.imageLastMovement = data;
      this.blockUI.stop();
    });
  }

  sendConfirmation(){
    this.submitted = true;
    if(this.barCode && this.resourceIn && this.currentResource && this.emplId){
      console.log("sendConfirmation: ", this.barCode, this.resourceIn, this.currentResource, this.productionKg, this.notes, this.emplId);
      let _currentUser = JSON.parse(localStorage.getItem('_currentUser'));
      let obj = {
        die : null,
        dieId: this.barCode,
        resourceIn: this.resourceIn,
        ResourceOut: this.currentResource,
        storagePlaceIn: null,
        kgProduced: this.directionReporting == 1 ? this.productionKg : null,
        notes: this.notes,
        emplId: this.emplId,
        computerName: _currentUser['userName']
      }

      this.dieService.postDieMovemanetConf(obj).subscribe(data => {
        this.submitted = false;
        this.blockUI.stop();
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg ,
          showConfirmButton: false,
          timer: 2000
        });

        this.directionReporting = 1;
        this.barCode = '';
        this.resourceIn = undefined;
        this.currentResource = undefined;
        this.notes = undefined;
        this.emplId = undefined;
        this.productionKg = undefined;
        this.rowsMovements = [];
      });

    } else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'warning',
        title: this.translateSnackBar.confMassageInvalid,
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  sortType(orderType, ind) {
    console.log('sortType', orderType)
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.getPositionDie();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    clearInterval(this.myInterval);
  }

}
