import { Component, ElementRef, HostListener, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, buffer, filter, scan } from 'rxjs';
import { ConfirmationService } from '../../@core/services/confirmation.service';
import { DataService } from '../../@core/services/data.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../core/services';
import { constants } from '../../../environments/constants';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import Swal from 'sweetalert2';

declare function pushSerial(scan:string, com:string, manufacturer:string):void;
declare function getSerial():string;
declare function clearSerial():void;

declare function pushSerialScale(scan:string, com:string, manufacturer:string):void;
declare function getSerialScale():string;
declare function clearSerialScale():void;

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})



export class ConfirmationComponent implements OnInit {

  confirmation: any;
  loading: boolean = false;
  dataServiceObj: any;
  subscription: Subscription;
  orderOperation: any = [];
  reasonsArr: any = [];
  reason: any;
  brakArr: any = [];
  workCenter: any = '';
  countBrak: any = '';
  countProduced: any = '';
  prevOperationCassetList: any = '';
  dmCArray: any = [];
  palletsArr: any;
  cassetPut:any = [];
  paletName: any;
  putCassetList: any = '';
  activeBox = 0;
  generateOrder: string = '';
  currentAutomotivePackingLotNo: any = [];
  orderOperationBilletLotNos: any = [];
  zebraPort: any;
  zebraCom: string;
  comPorts: any = [];
  buffer: string;
  label: string;
  inputRexBox: any = [];
  inputGreenBox: any = [];
  pcsInSinglePackage: any;
  pcsInSinglePackageNo: string = "";
  insertedRows: any = [];
  sumQuantity: number = 0;
  SCAN_PERIOD = 2000
  DEVICE_NAME: string;
  оutputLotNo: string = '';
  scaleArr: any = [];
  scaleData: any = {
    weight: 0,
    unitWeight: 0, //
    totalCount: 0 // бройка = Произведено к-во да стане countProduced
  };

  batchData: any = {
    checkForActiveBatch: true,
    NotConfirmBatchid: 0,
    NotConfirmBatchNo: ''
  };

  autoChoose: boolean = false;
  hideInput: boolean = true;
  reasonInputs: boolean = true;
  grossWeight:number = 0;  

  @ViewChild('myDivRed') myDivRed: ElementRef<HTMLElement>;
  @ViewChild('myDivGreen') myDivGreen: ElementRef<HTMLElement>;
  hideRedSection: boolean = false;
  hideGreenSection: boolean = false;
  amd: any;
  finishPackage: boolean = false;
  notes: string = '';
  myInterval: any;
  myIntervalCloseApp: any;
  tolerance: number = 0;


  constructor(
    public confirmationService: ConfirmationService,
    public activatedRoute: ActivatedRoute,
    public data: DataService,
    public location: Location,
    public router: Router,
    public toastrService: ToastrService,
    public electronService: ElectronService
  ) {

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      if(constants.comport == 0){
        this.scanPorts()
      } else {        
        this.comPorts = JSON.parse(localStorage.getItem('ComPort'));        
      }

      this.closeTime();

    } else {
      console.log('Run in browser');
    }

    this.myInterval = setInterval(() => {
      let scanner = getSerial();      
      if(scanner){
        this.openedScanZebra(scanner['scan'], scanner['com'], scanner['manufacturer']);
        clearSerial();
      }

      if(this.dataServiceObj.workType == 2){
        let scale = getSerialScale();        
        this.openedScale(scale['scan']);
        clearSerialScale();
      }

    }, 500);
   }

   ngOnInit(): void {
    this.dataServiceObj = JSON.parse(localStorage.getItem('dataRedirect'));
    console.log("dataServiceObj++", JSON.parse(localStorage.getItem('dataRedirect')));

    if(this.dataServiceObj.operationNo == 10){
      this.hideRedSection = true;
      this.activeBox = 1;
    }

    if(this.dataServiceObj.workCenterId == 17 || this.dataServiceObj.workCenterId == 55){
      this.hideGreenSection = true;
    }
    if(this.dataServiceObj.workCenterId == 55){
      this.getOrderConfirm(this.dataServiceObj.bomCode, this.dataServiceObj.salesOrderDescription);
    }
    this.getRequest(this.dataServiceObj.operationTypeId);
    this.getReason(this.dataServiceObj.operationTypeId);
    this.getBrak(this.dataServiceObj.orderId, this.dataServiceObj.operationNo);
    this.getPallet();
    if(this.dataServiceObj.operationNo != 10){
      this.getPreviousOperation();
    }

    if(this.dataServiceObj.operation.workCenterId == 55){
      this.getCurrentAutomotivePackingLotNo(this.dataServiceObj.operation.id);
    }      
    this.grossWeight = this.dataServiceObj.operation.grossWeight * 1000;      
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.electronService.isElectron) {
      this.electronService.closeWindows()
    }
  }

  closeTime(){        
    if (this.electronService.isElectron) {
      this.myIntervalCloseApp = setInterval(() => {      
        this.electronService.closeWindows()
      }, 600000);
    }    
  }

   public scanPorts () {

      this.electronService.serialPort.SerialPort.list().then((ports:any)=>{
        console.log("SerialPort -> ports: ", ports);
        // стойности на workType
        // 1 - няма устройство
        // 2 - скантар
        // 3 - скенер
        // ['com3', 'com3' , 'com5']
        ports.forEach(element => {
          if(element.manufacturer == constants.zebraProductName){
            constants.comport = 1;
            // localStorage.setItem('comport', '1');
            this.zebraCom = element.path;
            this.DEVICE_NAME = element.manufacturer;
            let checkedCom = this.comPorts.filter((item) =>{
              return item.path == element.path
            })

            if(checkedCom.length == 0){              
              this.comPorts.push(element);
            }
            
          }

          if(element.manufacturer == constants.prolificProductName || element.manufacturer == constants.standardPortTypes){
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
        // console.log('KAKWO IMAME W COMPORT: ', this.comPorts);
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
    // console.log('***************** initPort: ', comName, manufacturer);
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

  closed (manufacturer: string) {
    console.log(manufacturer + ' : Port Closed')
    this.scanPorts()
  }

  onData (data: Buffer, com: string, manufacturer: string) {
    // console.log('onData=================: ', data, com, manufacturer);
    if(manufacturer == constants.prolificProductName || manufacturer == constants.standardPortTypes){
      let scaleResult = this.splt(this.scaleParse(data));      
      this.recordScale(scaleResult, com, manufacturer);      
    } else {
      let tamp = this.parse(data);
      let text = tamp.search(/\r\n/i) >= 0 ?  tamp.split('\r\n')[0] : tamp;
      let scan = text.indexOf('http://') >= 0 ? text.split('http://')[1]: text;
      this.recordScanZebra(scan, com, manufacturer);
    }

  }

  public parse (data: any) {
    let rawStream = Buffer.from(data, 'ascii').toString();
    return rawStream;
  }

  scaleParse(data: any){
    this.scaleArr.push(Buffer.from(data, 'ascii'))
    let bufferdata = this.scaleArr.toString()
    let rep = bufferdata.replace(/,|_/g,'')
    return rep;
  }

  getRequest(id) {
    this.loading = true;
    this.confirmationService.getConfirmations(id).subscribe(data => {
      this.orderOperation = data;
      // if(this.dataServiceObj.workCenterId == 17){ //ръчна обработка 17
        this.getOrderOperationBilletLotNos(this.dataServiceObj.operation.id);      
        for(let i = 0; i < this.orderOperation.length; i++) {       
          this.orderOperation[i].inputCodeType = false; 
          if(this.orderOperation[i].code == 'OutputBilletLotNo'){
            if(this.orderOperationBilletLotNos.length > 0){
              // console.log('this.orderOperation[i].OutputBilletLotNo: LIST ', this.orderOperation[i].code, this.orderOperationBilletLotNos);
              this.orderOperation[i].inputCodeType = true;
              if(this.orderOperationBilletLotNos.length == 1){
                this.orderOperation[i].value = this.orderOperationBilletLotNos[0].name;
              } else {
                this.orderOperation[i].selectList = this.orderOperationBilletLotNos;
                // [{"id":1,"name":"Склад 1"},
                //   {"id":2,"name":"Склад 2"},
                //   {"id":3,"name":"Склад 3"}];
              }              
            } else {
              // console.log('this.orderOperation[i].OutputBilletLotNo: INPUT ', this.orderOperation[i].code, this.orderOperationBilletLotNos);
              this.orderOperation[i].inputCodeType = false;               
            }            
          }
        }
      // }      
      this.loading = false;
    });
  }

  getReason(id){
    this.loading = true;
    this.confirmationService.getReasons(id).subscribe(data => {
      this.reasonsArr = data;
      this.loading = false;
    });
  }

  getBrak(orderId, operationNo){
    this.loading = true;
    this.confirmationService.getBrak(orderId, operationNo).subscribe(data => {
      this.brakArr = data;
      this.loading = false;
    });
  }

  getPallet(){
    this.loading = true;
    this.confirmationService.getPallet().subscribe(data => {
      this.palletsArr = data;
      this.loading = false;
    });
  }

  getPreviousOperation(){
    this.loading = true;
    this.confirmationService.getPreviousOperation(this.dataServiceObj.productId, this.dataServiceObj.operationNo).subscribe({ next: (data) => {
      this.prevOperationCassetList = data.map((obj) => {
        obj.checked = false;
        return obj;
      });
      this.loading = false;
    },
      error: (err) => {
        this.toastrService.error(
          err.error, '',
          { toastClass: 'toast ngx-toastr', closeButton: false }
        );
        this.loading = false;
      }
    })
  }

  getOrderConfirm(bomCode, salesOrderDescription){
    this.loading = true;
    this.confirmationService.getOrderConfirm(bomCode, salesOrderDescription).subscribe(data => {
      this.pcsInSinglePackage = data.pcsInSinglePackage;
      this.loading = false;
    });
  }

  backClicked() {
    clearInterval(this.myInterval);
    clearInterval(this.myIntervalCloseApp);    
    this.location.back();
  }

  getStock(cassetPut){
    this.loading = true;
    let cassetArray = this.palletsArr.filter(p => p.name == cassetPut);
    this.cassetPut = cassetArray;
    this.confirmationService.getStock(cassetPut).subscribe(data => {
      this.putCassetList = data;
      this.loading = false;
      this.triggerGreenClick();
    });
  }

  clickBoxs(val){
    // console.log('this.buffer AMD', this.buffer);
    this.activeBox = val;
  }

  generateNewOrder(){
    if(this.generateOrder){
      this.loading = true;
      this.confirmationService.generateNewOrder(this.dataServiceObj.orderId, this.generateOrder).subscribe(data => {
        this.loading = false;
      });
    } else {
      this.toastrService.error(
        'Трябва да въведете количество!', '',
        { toastClass: 'toast ngx-toastr', closeButton: false }
      );
    }
  }

  checkOperationRow(row, event){
    if(event.target.checked == true){
      // setTimeout(() => {
        this.sumQuantity += row.quantity;
        row.checked = true;
        console.log('checkOperationRow: ', row.checked);
        this.triggerRedClick();
        if(this.dataServiceObj.workCenterId == 55){
          this.checkIfApproved(row, event);
        }
      // }, 1000);
    } else {
      row.checked = false;
      event.target.checked = false;
      this.sumQuantity -= row.quantity;
    }
  }


  checkIfApproved(row, event) {
    // console.log('checkIfApproved', row, event);
    this.loading = true;
    // 220805065428872 - sn за тест / row.sn
    this.confirmationService.checkIfApproved(row.sn).subscribe({
      next: (data) => {
        //   console.log("DATA checkIfApproved: ", data);
        if(data){
          let text = [];
          for(let i = 0; i < data.length; i++) {
            text.push('<br>Бач ' + data[i].bachno + ' не е одобрен и няма да се изпраща партидата към НАВ!') ;
          }

          Swal.fire({
            title: text.toString(),
            icon: 'warning',
            confirmButtonColor: '#7367F0',
            confirmButtonText: 'Добре',
            customClass: {
            confirmButton: 'btn btn-primary',
            }
          }).then((result) => {});
          row.checked = false;
          event.target.checked = false;
          this.sumQuantity -= row.quantity;
          this.batchData.checkForActiveBatch = false;
          this.batchData.NotConfirmBatchid = data[0].id;
          this.batchData.NotConfirmBatchNo = data[0].bachno;
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () =>{
        console.log('complete');
      }
    });
  }

  checkIfApprovedDms(dmc) {    
    this.loading = true;        
    this.confirmationService.checkForDoubleDMCCode(dmc).subscribe({
      next: (data) => {     
        console.log('checkForDoubleDMCCode', data);   
        if(data){                   
          
          let text = data.dmcName + ' код на ДМС се дублира!';
          Swal.fire({
            title: text.toString(),
            icon: 'warning',
            confirmButtonColor: '#7367F0',
            confirmButtonText: 'Добре',
            customClass: {
            confirmButton: 'btn btn-primary',
            }
          }).then((result) => {
            // return data;
          });       
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;        
      }
    });    
  }

  checkProducedBrak(event){
    if(this.orderOperation.length > 0){
      for(let i=0; i < this.orderOperation.length; i++){
        if(this.orderOperation[i].code == "PiecesProduced" || this.orderOperation[i].code == "PpcOK"){
          this.orderOperation[i].value = event;
        }
      }
    }
  }

  checkScrap(event){
    if(this.orderOperation.length > 0){
      for(let i=0; i < this.orderOperation.length; i++){
        if(this.orderOperation[i].code == "PiecesScrap" || this.orderOperation[i].code == "PpcScrap"){
          this.orderOperation[i].value = event;
          if(event == 0 || event == undefined)
            {
              this.reasonInputs = true;
            }else{
              this.reasonInputs = false;
            }
        }
      }
    }
  }

  checkInputRows(value, row){
    // console.log('checkInputRows', value, row);
    if(row.code == "PiecesProduced" || row.code == "PpcOK"){
      this.countProduced = value;
    }
    if(row.code == "PiecesScrap" || row.code == "PpcScrap"){
      this.countBrak = value;
      if(value == 0 || value == undefined)
      {
        this.reasonInputs = true;
      }else{
        this.reasonInputs = false;
      }
    }
  }

  recordScanZebra(scan, com, manufacturer){
    pushSerial(scan, com, manufacturer);
  }

  recordScale(scan, com, manufacturer){
    pushSerialScale(scan, com, manufacturer)
  }

  openedScale(scaleResult){
    if(scaleResult != undefined){
      this.scaleData = scaleResult;
      this.countProduced = this.scaleData.totalCount;   

      if(this.countProduced == this.pcsInSinglePackage){
        this.finishPackage = true;
      }else{
        this.finishPackage = false;
      }

      let procent = Number(this.scaleData.unitWeight) / Number(this.grossWeight);      
      if(procent >= 0.95 && procent <= 1.05){
        this.tolerance = 1;
      } else{
        this.tolerance = 0;
      }
      
    }
  }

  openedScanZebra(scan, com ,manufacturer){
    let val = { target: { checked: true}};
    // console.log('scan: ', scan, manufacturer)
    if(scan.length > 0){
      if(this.activeBox == 0){
        // console.log('**********',this.dataServiceObj.workType, this.comPorts);
        if(this.dataServiceObj.workType == 3){
        // let filterCom =   this.comPorts.filter((item) => {
        //   return item. constants.zebraProductName;
        // }); 
        // console.log('scan: 1** ', this.comPorts);
        if(this.comPorts[0].path == com){

          // let filterRed = this.inputRexBox.filter((item) => {
          //   return item.includes(scan);
          // });
          // filterRed.length == 0 &&
          // console.log('scan: 2 V IF ', this.comPorts[0].path, com, scan);
          if(scan.length > 0){
            for(let i = 0; i < this.prevOperationCassetList.length; i++){
              if(this.prevOperationCassetList[i].warehouseName == scan && this.prevOperationCassetList[i].checked != true){
                this.checkOperationRow(this.prevOperationCassetList[i], val)           ;
                break;
              }
            }
          }
        } else {
          let filterDMC = this.dmCArray.filter((item) => {
            return item.includes(scan);
          });
          // console.log('scan: 3 V ELSE ', this.comPorts[1].path, com, scan, filterDMC);
          if(filterDMC.length == 0 && scan.length > 0){            
            // if(this.checkIfApprovedDms(scan)){
              // this.dmCArray.push(scan);
              // this.countProduced = this.dmCArray.length;
            // }    
            
            this.confirmationService.checkForDoubleDMCCode(scan).subscribe({
              next: (data) => {     
                console.log('checkForDoubleDMCCode', data);   
                if(data){                   
                  
                  let text = data.dmcName + ' код на ДМС се дублира!';
                  Swal.fire({
                    title: text.toString(),
                    icon: 'warning',
                    confirmButtonColor: '#7367F0',
                    confirmButtonText: 'Добре',
                    customClass: {
                    confirmButton: 'btn btn-primary',
                    }
                  }).then((result) => {
                    // return data;
                  });       
                }
                this.loading = false;
              },
              error: (err) => {
                this.loading = false;    
                this.dmCArray.push(scan);
                this.countProduced = this.dmCArray.length;    
              }
            });   
          }

          if(this.countProduced == this.pcsInSinglePackage){
            this.finishPackage = true;
          }else{
            this.finishPackage = false;
          }
        }

        } else {
          // console.log('TUKA VLIZA!!!');
          // let filterRed = this.inputRexBox.filter((item) => {
          //   return item.includes(scan);
          // });

          if(scan.length > 0){
            for(let i = 0; i < this.prevOperationCassetList.length; i++){
              if(this.prevOperationCassetList[i].warehouseName == scan && this.prevOperationCassetList[i].checked != true){
                this.checkOperationRow(this.prevOperationCassetList[i], val)           ;
                break;
              }
            }
          }
        }

      } else {
        if(scan.length > 0){
              this.getStock(scan);
        }
      }
      // console.log("RED/GREEN", scan, this.activeBox);
    }
  }

  deleteDms(dmc){
    const index = this.dmCArray.indexOf(dmc);
    if(index > -1){
      this.dmCArray.splice(index, 1);
      this.countProduced = this.dmCArray.length;
    }
  }

  validationInputs(){
    let flag = false;
    for(let i = 0; i < this.orderOperation.length; i++){
      if(this.orderOperation[i].code == "PiecesScrap"){
        flag = true;
        if(this.orderOperation[i].value > 0){
          if(!this.workCenter && !this.reason){
            return false;
          } else if(this.workCenter && this.reason){
            return true;
          }
        } else {
          return true;
        }
      }
    }
    if(flag == true && this.workCenter && this.reason || flag == false && !this.workCenter && !this.reason){
      return true;
    } else {
      return false;
    }
  }

  validationRedSection(){
    if(this.prevOperationCassetList.length > 0 && this.sumQuantity > this.countProduced){
      return true;
    } else if(this.prevOperationCassetList.length == 0){
      return true;
    } else {
      return false;
    }
  }

  loadComponent() {
    
    let validInputScrap = this.validationInputs();
    let validRedSection = this.validationRedSection();
    if (this.countProduced) {
      if (validRedSection || (!validRedSection && this.autoChoose == true)) {
        if (validInputScrap) {          
          if(this.putCassetList.length > 0 || this.autoChoose == true || this.dataServiceObj.workCenterId == 55) {                       
              if((this.dataServiceObj.workType == 2 && this.dataServiceObj.workCenterId == 55 && this.countProduced == this.pcsInSinglePackage)
                  || (this.dataServiceObj.workType == 3 && this.dataServiceObj.workCenterId == 55 && this.countProduced == this.pcsInSinglePackage)){
                  this.toastrService.error(
                    'Произведеното количество трябва да е равни на макс бройки!', '',
                    { toastClass: 'toast ngx-toastr', closeButton: false }
                  );
                  return;
              }
              
            if((this.dataServiceObj.operation.workCenterId == 55 && this.dataServiceObj.workType == 1) || (this.dataServiceObj.operation.workCenterId != 55)){
              let validFlag = 0;
              for(let i = 0; i < this.orderOperation.length; i++) {     
                if(this.orderOperation[i].inputType == true && this.orderOperation[i].mandatory == true){        
                  if(!this.orderOperation[i].value){          
                    validFlag++;
                  }        
                }
              }
              
              if(validFlag > 0){
                this.toastrService.error(
                  'Моля, попълнете всички полета.', '',
                  { toastClass: 'toast ngx-toastr', closeButton: false }
                );
  
                return;
              }
            }
        
            if(this.dataServiceObj.operation.workCenterId == 55){
              this.оutputLotNo = this.currentAutomotivePackingLotNo.currentLot;   
            }
            
            let checkPrevOperation = []
              this.dataServiceObj.image = '';
              
              for(let i = 0; i < this.prevOperationCassetList.length; i++) {
                if(this.prevOperationCassetList[i].checked == true){
                  checkPrevOperation.push(this.prevOperationCassetList[i]);
                }
              }

              let arrComponent = {};
              arrComponent = {
                countBrak: this.countBrak.length == 0? 0 : this.countBrak,
                countProduced: this.countProduced,
                workCenter: this.workCenter,
                finishPackage: this.finishPackage,
                reason: this.reason,
                notes: this.notes,
                generateOrder: this.generateOrder,
                scaleData: this.scaleData,
                orderOperation: this.orderOperation,
                autoChoose: this.autoChoose,
                prevOperationCassetList: checkPrevOperation,
                sumQuantity: this.sumQuantity,
                putCassetData: this.cassetPut,
                operation: this.dataServiceObj,
                batchData: this.batchData,
                dmcList: this.dmCArray,
                оutputLotNo: this.оutputLotNo
              }

              this.data.changeMessage(arrComponent);
              localStorage.setItem('dataRedirectConfirmation', JSON.stringify(arrComponent));
              clearInterval(this.myInterval);
              clearInterval(this.myIntervalCloseApp);
              this.router.navigate(['api/component']);
          } else {
            this.toastrService.error(
              'Моля изберете касетка/палет за готовата продукция!', '',
              { toastClass: 'toast ngx-toastr', closeButton: false }
            );
          }
        } else {
          this.toastrService.error(
            'Трябва да въведете Брак РЦ и Причина!', '',
            { toastClass: 'toast ngx-toastr', closeButton: false }
          );
        }
      } else {
        this.toastrService.error(
          'Общото количество не може да е по-малко от Произведеното количество!', '',
          { toastClass: 'toast ngx-toastr', closeButton: false }
        );
      }
    } else {
      this.toastrService.error(
        'Трябва да въведете Произведено количество!', '',
        { toastClass: 'toast ngx-toastr', closeButton: false }
      );
    }

  }
  
  getCurrentAutomotivePackingLotNo(operationId) {
    this.loading = true;
    this.confirmationService.getCurrentAutomotivePackingLotNo(operationId).subscribe({ next: (data) => {
      this.currentAutomotivePackingLotNo = data;   
      if(this.currentAutomotivePackingLotNo.usedCapacity != 0){
        this.pcsInSinglePackage -= this.currentAutomotivePackingLotNo.usedCapacity;
        this.pcsInSinglePackageNo = ', Опаковка №: ' + this.currentAutomotivePackingLotNo.currentLot;
        // това да се добави полето което якуб прато v: currentLot
      }
      console.log('this.pcsInSinglePackage: ', this.pcsInSinglePackage, this.currentAutomotivePackingLotNo)
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
    },
    complete: () => {}
    });

  }

  getOrderOperationBilletLotNos(operationId){
    this.loading = true;
    this.confirmationService.getOrderOperationBilletLotNos(operationId).subscribe({ next: (data) => {
      this.orderOperationBilletLotNos = data;      
      this.loading = false;      
    },
    error: (err) => {
      this.loading = false;
    },
    complete: () => {}
    });

  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    clearInterval(this.myInterval);
    clearInterval(this.myIntervalCloseApp);    
  }

  triggerRedClick() {
    let el: HTMLElement = this.myDivRed.nativeElement;
    el.click()
  }

  triggerGreenClick() {
    let el: HTMLElement = this.myDivGreen.nativeElement;
    el.click();
  }

  splt(val){
    if(val != undefined && val.length > 200)
    {
      let val1 = val.split("g/pcs");
      let valSp = val1[val1.length - 2].split("+");
      let unitWeight = valSp[valSp.length - 1].split('g')[0];
      let temp = valSp[valSp.length - 2].split('pcs')[0];
      // console.log('temp.split():', temp.split('g'));

      let weight = temp.split('g')[0];
      let totalCount = valSp[valSp.length - 3].split('pcs')[0];
      if(unitWeight != undefined && weight != undefined && totalCount != undefined){
        return {unitWeight: Number(unitWeight), weight: Number(weight), totalCount: Number(totalCount) }
      }
    }
  }
}