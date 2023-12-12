import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../../../../environments/constants';
import { environment } from '../../../../environments/environment';
import { User } from '../../../auth/models';
import { ElectronService } from '../../../core/services';
const { version: appVersion } = require('../../../../../package.json')


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public translateSnackBar: any;
  public appVersion;
  public env: string;
  userName: any;
  public _currentUser: User;
  public comPorts: any = [];
  public zebraCom: string;
  DEVICE_NAME: string;
  public allPorts: any = [];

  constructor(public translate: TranslateService,
              public electronService: ElectronService) {

      if (electronService.isElectron) {
        console.log(process.env);
        console.log('Run in electron');
        console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
        console.log('NodeJS childProcess', this.electronService.childProcess);

        console.log('constants.comport', constants.comport);
        if(constants.comport == 0){
          // this.scanPorts()
        } else {
          this.comPorts = JSON.parse(localStorage.getItem('ComPort'));
          this.allPorts = this.comPorts;
        }

      } else {
        console.log('Run in browser');
      }

  }

  ngOnInit(): void {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this._currentUser = JSON.parse(localStorage.getItem('_currentUser'));
    this.userName = this._currentUser['userName'];
    this.appVersion = appVersion;
    if(environment.apiUrl.includes('192.168.8.84:91') == true || environment.apiUrl.includes('185.177.116.190') == true || environment.apiUrl.includes('localhost') == true){
      this.env = "Dev";
    } else if(environment.apiUrl.includes('192.168.8.240/webapi') == true) {
      this.env = "Prod";
    } else {
      this.env = "none";
    }
  }

  // public scanPorts () {

  //   this.electronService.serialPort.SerialPort.list().then((ports:any)=>{
  //     console.log("SerialPort -> ports: ", ports);
  //     this.allPorts = ports;
  //     ports.forEach(element => {
  //       if(element.manufacturer == constants.zebraProductName){
  //         constants.comport = 1;
  //         this.zebraCom = element.path;
  //         this.DEVICE_NAME = element.manufacturer;
  //         let checkedCom = this.comPorts.filter((item) =>{
  //           return item.path == element.path
  //         })

  //         if(checkedCom.length == 0){
  //           this.comPorts.push(element);
  //         }

  //       }
  //     });

  //     this.comPorts = this.comPorts.sort((a, b) => a.path < b.path ? - 1 : Number(a.path > b.path));
  //     localStorage.setItem('ComPort', JSON.stringify(this.comPorts));
  //   }).catch((err:any)=>{
  //     console.log("SerialPort -> err: ", err);
  //   });
  // }


}
