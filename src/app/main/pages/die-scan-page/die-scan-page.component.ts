import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';
import { DieScanModalComponent } from '../../modals/die-scan-modal/die-scan-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../../core/services';
import { constants } from '../../../../environments/constants';

declare function pushSerial(scan:string, com:string, manufacturer:string):void;
declare function getSerial():string;
declare function clearSerial():void;

@Component({
  selector: 'app-die-scan-page',
  templateUrl: './die-scan-page.component.html',
  styleUrls: ['./die-scan-page.component.scss']
})
export class DieScanPageComponent implements OnInit {

  displayedColumns: string[] = ['dieId', 'resourceIn', 'resourceOut', 'movementDateTime', 'notes', 'computerName',];
  displayedColumnsDie: string[] = ['matrix', 'skladPlace', 'lastTransaction',];
  public loading: boolean;
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
  DEVICE_NAME: string;


  myInterval: any;
  comPorts: any = [];
  zebraCom: string;
  SCAN_PERIOD = 2000;
  zebraPort: any;

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
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.getResource();
    this.getEmployee();
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
    this.getBarCodesTable();
  }



  getResource() {
    this.dieService.getResource().subscribe(data => {
      console.log("getBarCode", data);
      this.resource = data;
      this.loading = false;
    });
  }

  getEmployee() {
    this.dieService.getEmployee().subscribe(data => {
      console.log("getEmployee", data);
      this.employee = data;
      this.loading = false;
    });
  }

  getImage(row) {
    this.loading = true;
    this.dieService.getImage(row.profile).subscribe(data => {
      console.log("getImage", data);
      this.image = data;
      this.loading = false;
    });
  }

  getMovements(resourceIn) {
    this.loading = true;
    this.dieService.getMovements(resourceIn).subscribe(data => {
      console.log("getMovements", data);
      this.rowsMovements = data;
      this.imageLastMovement.name = '';
      this.loading = false;
    });
  }

  getBarCodesTable() {
    console.log('getBarCodesTable: ', this.barCode);
    if (this.barCode && this.barCode.toString().length == 7) {
      this.openBarCodeModal(this.barCode);
    }
  }

  openBarCodeModal(value) {
    console.log('openBarCodeModal', value);
    const modalRef = this.modalService.open(DieScanModalComponent, {});
    modalRef.componentInstance.dieItem = { 'die': value };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {
        this.getImage(receivedEntry);
        this.currentResource = receivedEntry.resourceIn;
        this.barCode = receivedEntry.dieId;
      }
    });
  }

  lastMovementRow(row) {
    console.log('lastMovementRow', row);
    this.loading = true;
    this.dieService.getImage(row.profile).subscribe(data => {
      console.log("lastMovementRow getImage", data);
      this.imageLastMovement = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    clearInterval(this.myInterval);   
  }

}
