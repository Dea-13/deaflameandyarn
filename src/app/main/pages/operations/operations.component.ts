import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../@core/services/data.service';
import { OperationsService } from '../../../@core/services/operations.service';
import { Location } from '@angular/common';
import { constants } from '../../../../environments/constants';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../../core/services';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  loading: boolean;
  rows: any = [];
  limit: number = 15;
  offset: number = 0;
  workCenterId: any;
  searchValue: string = '';
  name: string;

  dataServiceObj: any;
  subscription: Subscription;
  myIntervalCloseApp: any;

  constructor(
    private operationsService: OperationsService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private data: DataService,
    private location: Location,
    private toastrService: ToastrService,
    public electronService: ElectronService
  ) {}

  ngOnInit(): void {
    // this.subscription = this.data.currentMessage.subscribe(
    //   (dataServiceObj) => (this.dataServiceObj = dataServiceObj)
    // );
    this.dataServiceObj = JSON.parse(localStorage.getItem('dataRedirectOperation'));
    console.log("dataServiceObj++", JSON.parse(localStorage.getItem('dataRedirectOperation')));
    this.workCenterId = this.dataServiceObj['id'];
    this.name = this.dataServiceObj['name'];
    console.log('this.name: ', this.name)
    console.log(
      'dataServiceObj',
      this.dataServiceObj,
      constants.comport,
      this.subscription
    );
    this.getRequest();
    this.closeTime();
  }

  getRequest() {
    this.loading = true;
    this.operationsService
      .getOperations(this.offset, this.limit, this.workCenterId)
      .subscribe((data) => {
        this.rows = data;
        for (let i = 0; i < this.rows.length; i++) {
          this.rows[i].duration = this.convert(
            new Date(this.rows[i].endDate).getTime() -
              new Date(this.rows[i].startDate).getTime()
          );
        }
        console.log('DATA', this.rows);
        this.loading = false;
      });
  }

  convert(t) {
    const dt = new Date(t);
    const hr = dt.getUTCHours();
    const m = '0' + dt.getUTCMinutes();

    return hr + ':' + m.substr(-2);
  }

  onScroll() {
    this.loading = true;
    const length = this.rows.length;
    console.log('SCROLLLLLL', length + 15, this.searchValue);
    setTimeout(() => {
      this.limit = length + 15;
      if (this.searchValue != '') {
        this.searchTable(this.searchValue);
      } else {
        this.getRequest();
      }
      this.loading = false;
    }, 1000);
  }

  searchTable(value) {
    console.log('searchTable', value);
    this.loading = true;
    this.rows = [];
    if (value) {
      this.operationsService
        .searchOperations(this.workCenterId, value)
        .subscribe((data) => {
          this.rows = data;
          for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].duration = this.convert(
              new Date(this.rows[i].endDate).getTime() -
                new Date(this.rows[i].startDate).getTime()
            );
          }
          console.log('DATA', this.rows);
          this.loading = false;
        });
    } else {
      this.getRequest();
    }
  }

  clearTable() {
    console.log('clearTable');
    this.searchValue = '';
    this.getRequest();
  }

  redirectToConfirmation(row) {
    if(row.workCenterId != 55 || (row.workCenterId == 55 && row.bomCode)){
      this.data.changeMessage(row);
      console.log('NAVIGATE: ', row.operationTypeId, row.id, row.productId, row.operationNo, row.orderId, row.bomCode, '-', row.salesOrderDescription, row.workCenterId, row.pasivationDate, row.workType, row.salesOrderDescription );
      let obj = {
        'operationTypeId': row.operationTypeId,
        'id': row.id,
        'productId': row.productId,
        'operationNo': row.operationNo,
        'orderId': row.orderId,
        'bomCode': row.bomCode,
        'salesOrderDescription': row.salesOrderDescription,
        'workCenterId': row.workCenterId,
        'pasivationDate': row.pasivationDate,
        'workType': row.workType,
        'operation': row
      }
      localStorage.setItem('dataRedirect', JSON.stringify(obj));
      this.router.navigate(['api/confirmation']);
    } else{
      this.toastrService.error(
        'Не е зададена инструкция!',
        '' ,
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
    }
   
  }

  backClicked() {
    this.location.back();
  }

  closeTime() {        
    if (this.electronService.isElectron) {
      this.myIntervalCloseApp = setInterval(() => {      
        this.electronService.closeWindows()
      }, 600000);
    }    
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    clearInterval(this.myIntervalCloseApp);    
  }
}
