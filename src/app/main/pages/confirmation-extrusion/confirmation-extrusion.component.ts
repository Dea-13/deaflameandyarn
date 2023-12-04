import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from '../../../@core/services/confirmation.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-confirmation-extrusion',
  templateUrl: './confirmation-extrusion.component.html',
  styleUrls: ['./confirmation-extrusion.component.scss']
})
export class ConfirmationExtrusionComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumn: string[] = [
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
    'customerName', 'computerName',
    'remainingQty', 'color'
  ];

  public rows: Array<any> = [];
  public languageOptions: any;
  public translateSnackBar: any;

  public size = 13;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;

  public urls = [
    { id: 0, name: 'PullerSpeed' },
    { id: 1, name: 'BilletTemperature' },
    { id: 2, name: 'ExitTemperature' },
    { id: 3, name: 'DieStatus' },
    { id: 4, name: 'LengthFinalPiece' },
    { id: 5, name: 'Kgnet' },
    { id: 6, name: 'Kggross' },
    { id: 7, name: 'ModifiedOn' },
    { id: 8, name: 'BatchId' },
    { id: 9, name: 'FirstBilletCounter' },
    { id: 10, name: 'LastBilletcounter' },
    { id: 11, name: 'BilletMaterial' },
    { id: 12, name: 'ProductionOrder' },
    { id: 13, name: 'BilletPcs' },
    { id: 14, name: 'ExtrusionLength' },
    { id: 15, name: 'PiecesExtrusion' },
    { id: 16, name: 'ProdOrderQty' },
    { id: 17, name: 'Remarks' },
    { id: 18, name: 'RemarksQc' },
    { id: 19, name: 'StartTime' },
    { id: 20, name: 'PostingDate' },
    { id: 21, name: 'Alloy' },
    { id: 22, name: 'NumberOfEmployees' },
    { id: 23, name: 'OrderAlloy' },
    { id: 24, name: 'Profile' },
    { id: 25, name: 'Length' },
    { id: 26, name: 'Temper' },
    { id: 27, name: 'SalesOrder' },
    { id: 28, name: 'SalesOrderItem' },
    { id: 29, name: 'RemainingQty' },
    { id: 30, name: 'Color' },
  ];
  public arrFilters: any = [];
  public refreshed: Date;
  public orderBy: number = 0;
  public orderType: number = 1;
  public indColumn: any;

  public range = new FormGroup({
    endDate: new FormControl(null),
    startDate: new FormControl(null),
  });

  constructor(
    private confService: ConfirmationService,
    public translate: TranslateService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.arrFilters = [
      {id: 0, ind: 0, url: 'PullerSpeed', name: this.translateSnackBar.pullerSpeed, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 1, ind: 1, url: 'BilletTemperature', name: this.translateSnackBar.billetTemperature, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 2, ind: 2, url: 'ExitTemperature', name: this.translateSnackBar.exitTemperature, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 3, ind: 3, url: 'DieStatus', name: this.translateSnackBar.variant, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 4, ind: 4, url: 'LengthFinalPiece', name: this.translateSnackBar.lengthFinalPiece, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 5, ind: 5, url: 'Kgnet', name: this.translateSnackBar.kgnet, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 6, ind: 6, url: 'Kggross', name: this.translateSnackBar.kggross, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 7, ind: 7, url: 'ModifiedOn', name: this.translateSnackBar.modifiedOn, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 8, ind: 8, url: 'BatchId', name: this.translateSnackBar.batchId, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 9, ind: 9, url: 'FirstBilletCounter', name: this.translateSnackBar.firstBilletCounter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 10, ind: 10, url: 'LastBilletcounter', name: this.translateSnackBar.lastBilletcounter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 11, ind: 11, url: 'BilletMaterial', name: this.translateSnackBar.billetMaterial, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 12, ind: 12, url: 'ProductionOrder', name: this.translateSnackBar.productionOrder, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 13, ind: 13, url: 'BilletPcs', name: this.translateSnackBar.billetPcs, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 14, ind: 14, url: 'ExtrusionLength', name: this.translateSnackBar.extrusionLength, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 15, ind: 15, url: 'PiecesExtrusion', name: this.translateSnackBar.piecesExtrusion, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 16, ind: 16, url: 'ProdOrderQty', name: this.translateSnackBar.prodOrderQty, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 17, ind: 17, url: 'Remarks', name: this.translateSnackBar.remarks, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 18, ind: 18, url: 'RemarksQc', name: this.translateSnackBar.remarksQc, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 19, ind: 19, url: 'StartTime', name: this.translateSnackBar.startTime, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 20, ind: 20, url: 'PostingDate', name: this.translateSnackBar.postingDate, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 21, ind: 21, url: 'Alloy', name: this.translateSnackBar.alloy, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 22, ind: 22, url: 'NumberOfEmployees', name: this.translateSnackBar.numberOfEmployees, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 23, ind: 23, url: 'OrderAlloy', name: this.translateSnackBar.orderAlloy, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 24, ind: 24, url: 'Profile', name: this.translateSnackBar.profile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 25, ind: 25, url: 'Length', name: this.translateSnackBar.length, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 26, ind: 26, url: 'Temper', name: this.translateSnackBar.temper, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 27, ind: 27, url: 'SalesOrder', name: this.translateSnackBar.salesOrder, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 28, ind: 28, url: 'SalesOrderItem', name: this.translateSnackBar.salesOrderItem, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 29, ind: 29, url: 'RemainingQty', name: this.translateSnackBar.remainingQty, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 30, ind: 30, url: 'Color', name: this.translateSnackBar.color, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''}
    ];
   }

  ngOnInit(): void {
    this.pageChanged(1);
    // this.getFilters(this.urls.length, 'init');
  }

  getRequest() {
    this.blockUI.start('Loading...');
    this.confService.getConfExtrusion(
      this.offset,
      this.limit,
      this.arrFilters[0].model,
      this.arrFilters[1].model,
      this.arrFilters[2].model,
      this.arrFilters[3].model,
      this.arrFilters[4].model,
      this.arrFilters[5].model,
      this.arrFilters[6].model,
      this.arrFilters[7].model,
      this.arrFilters[8].model,
      this.arrFilters[9].model,
      this.arrFilters[10].model,
      this.arrFilters[11].model,
      this.arrFilters[12].model,
      this.arrFilters[13].model,
      this.arrFilters[14].model,
      this.arrFilters[15].model,
      this.arrFilters[16].model,
      this.arrFilters[17].model,
      this.arrFilters[18].model,
      this.arrFilters[19].model,
      this.arrFilters[20].model,
      this.arrFilters[21].model,
      this.arrFilters[22].model,
      this.arrFilters[23].model,
      this.arrFilters[24].model,
      this.arrFilters[25].model,
      this.arrFilters[26].model,
      this.arrFilters[27].model,
      this.arrFilters[28].model,
      this.arrFilters[29].model,
      this.arrFilters[30].model,
      this.arrFilters[30].model,
      this.arrFilters[30].model,
      this.arrFilters[30].model,
      this.orderType,
      this.orderBy
    ).subscribe((data) => {
      this.rows = data;
      this.blockUI.stop();
    });
  }

  getFilters(ind, action) {
    console.log('getFilters', this.arrFilters);
    let count = 0;
    for (let i = 0; i < this.urls.length; i++) {
      if(ind != this.urls[i].id) {
        let array = [];
        count++;
        this.confService.getFilters(
          this.urls[i].name,
          this.arrFilters[0].model,
          this.arrFilters[1].model,
          this.arrFilters[2].model,
          this.arrFilters[3].model,
          this.arrFilters[4].model,
          this.arrFilters[5].model,
          this.arrFilters[6].model,
          this.arrFilters[7].model,
          this.arrFilters[8].model,
          this.arrFilters[9].model,
          this.arrFilters[10].model,
          this.arrFilters[11].model,
          this.arrFilters[12].model,
          this.arrFilters[13].model,
          this.arrFilters[14].model,
          this.arrFilters[15].model,
          this.arrFilters[16].model,
          this.arrFilters[17].model,
          this.arrFilters[18].model,
          this.arrFilters[19].model,
          this.arrFilters[20].model,
          this.arrFilters[21].model,
          this.arrFilters[22].model,
          this.arrFilters[23].model,
          this.arrFilters[24].model,
          this.arrFilters[25].model,
          this.arrFilters[26].model,
          this.arrFilters[27].model,
          this.arrFilters[28].model,
          this.arrFilters[29].model,
          this.arrFilters[30].model,
          this.arrFilters[30].model,
          this.arrFilters[30].model,
          this.arrFilters[30].model,
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

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }

  sortType(orderType, ind) {
    console.log('sortType', orderType)
    // this.blockUI.start('Loading...');
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.getRequest();
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

    // this.getFilters(ind, 'edit');
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

  clarAll() {
    this.offset = 0;
    this.limit = 15;
    this.orderBy = 0;
    this.orderType = 1;
    for(let i=0; i < this.arrFilters.length; i++) {
      this.arrFilters[i].model= '';
    }
    this.getRequest();
    // this.getFilters(this.urls.length, 'init');
  }

}
