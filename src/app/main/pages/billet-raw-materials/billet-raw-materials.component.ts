import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BilletRawMaterialsService } from '../../../@core/services/billet-materials.servise';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-billet-raw-materials',
  templateUrl: './billet-raw-materials.component.html',
  styleUrls: ['./billet-raw-materials.component.scss']
})
export class BilletRawMaterialsComponent implements OnInit {
 // Public
 @BlockUI('block') blockUI: NgBlockUI;
 displayedColumn: string[] = [
  'name', 'description', 'lotNo',
  'variant', 'stockQuantity', 'uom',
  'diameter', 'modifiedOn'];

public rows = [{}];
public languageOptions: any;
public translateSnackBar: any;

public size = 13;
//for pagination
public cPage: number = 1;
public limit: number = 15;
public offset: number = 0;
public totalResult: number = 0;

public urls = [
  { id: 0, name: 'Name' },
  { id: 1, name: 'Description' },
  { id: 2, name: 'LotNo' },
  { id: 3, name: 'Variant' },
  { id: 4, name: 'UoM' },
  { id: 5, name: 'StockQuantity' },
  { id: 6, name: 'Diameter' },
];
public arrFilters: any = [];
public refreshed: Date;
public orderBy: number = 0;
public orderType: number = 1;
public indColumn: any;
public count: number = 0;
public countTable: number = 0;

public range = new FormGroup({
  endDate: new FormControl(null),
  startDate: new FormControl(null),
});

constructor(
  private billteService: BilletRawMaterialsService,
  public translate: TranslateService,
) {
  this.translate.get('translate').subscribe((snackBar: string) => {
    this.translateSnackBar = snackBar;
  });

  this.arrFilters = [
    {id: 0, ind: 0, url: 'Name', name: this.translateSnackBar.name, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    {id: 1, ind: 1, url: 'Description', name: this.translateSnackBar.description, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    {id: 2, ind: 2, url: 'LotNo', name: this.translateSnackBar.batch, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    {id: 3, ind: 3, url: 'Variant', name: this.translateSnackBar.variant, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    {id: 4, ind: 4, url: 'UoM', name: this.translateSnackBar.uom, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    {id: 5, ind: 5, url: 'StockQuantity', name: this.translateSnackBar.stockQuantity, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    {id: 6, ind: 6, url: 'Diameter', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
  ];
}

ngOnInit(): void {
  this.getRequest();
  this.getFilters(this.urls.length, 'init');
}

getRequest() {
  this.countTable = 0;
  this.blockUI.start('Loading...');
  this.billteService.getBilletMaterial(
    this.offset,
    this.limit,
    this.arrFilters[0].model,
    this.arrFilters[1].model,
    this.arrFilters[2].model,
    this.arrFilters[3].model,
    this.arrFilters[4].model,
    this.arrFilters[5].model,
    this.arrFilters[6].model,
    this.range.controls['startDate'].value ? moment(this.range.controls['startDate'].value).format('YYYY-MM-DDT00:01:00') : '',
    this.range.controls['endDate'].value ? moment(this.range.controls['endDate'].value).format('YYYY-MM-DDT23:59:00') : '',
    this.orderType,
    this.orderBy
  ).subscribe((data) => {
    this.rows = data.list;
    this.totalResult = data.total;
    this.blockUI.stop();
  }, error =>{
    this.blockUI.stop();
  });
}

getFilters(ind, action) {
  console.log('getFilters', this.arrFilters);
  this.count = 0;
  for (let i = 0; i < this.urls.length; i++) {
    if(ind != this.urls[i].id) {
      let array = [];
      this.billteService.getFilters(
        this.urls[i].name,
        this.arrFilters[0].model,
        this.arrFilters[1].model,
        this.arrFilters[2].model,
        this.arrFilters[3].model,
        this.arrFilters[4].model,
        this.arrFilters[5].model,
        this.arrFilters[6].model,
        this.range.controls['startDate'].value ? moment(this.range.controls['startDate'].value).format('YYYY-MM-DDT00:01:00') : '',
        this.range.controls['endDate'].value ? moment(this.range.controls['endDate'].value).format('YYYY-MM-DDT23:59:00') : '',
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

sortType(orderType, ind) {
  console.log('sortType', orderType)
  this.indColumn = ind;
  this.orderBy = ind;
  if (orderType == true) {
    this.orderType = 1;
  } else {
    this.orderType = 0;
  }
  this.pageChanged(1);
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

filterDate(){
  this.pageChanged(1);
}

clearAll() {
  this.offset = 0;
  this.limit = 15;
  this.orderBy = 0;
  this.orderType = 1;
  this.range.reset();
  for(let i=0; i < this.arrFilters.length; i++) {
    this.arrFilters[i].model= '';
  }
  this.pageChanged(1);
  this.getFilters(this.urls.length, 'init');
}

clearDate(){
  this.range.reset();
  this.pageChanged(1);
  this.getFilters(this.urls.length, 'init');
}

}
