import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseService } from '../../../@core/services/warehouse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseListDieModalComponent } from '../../modals/warehouse-list-die-modal/warehouse-list-die-modal.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-free-address',
  templateUrl: './free-address.component.html',
  styleUrls: ['./free-address.component.scss'],
})
export class FreeAddressComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = [];
  public urls = [
    { id: 0, name: 'ResourceName' },
    { id: 1, name: 'StoragePlace' },
    // { id: 2, name: 'ResourceID' },
    // { id: 3, name: 'SingleDie' },
    // { id: 4, name: 'Capacity' },
    // { id: 5, name: 'CapacityUoM' },
    // { id: 6, name: 'UsedCapacity' },
    // { id: 7, name: 'ParentID' },
  ];
  public orderBy: number = 0;
  public orderType: number = 1;
  public indColumn: any;
  public rows = [];
  public size = 13;
  public searchValue = '';
  public selectedOption = 10;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public leastDaysAgo = this.limit * this.cPage;
  public totalResult: number = 0;
  public maxSize = 10;
  public itemsPerPage = 15;
  public countRows: number = 15;
  public languageOptions: any;
  public translateSnackBar: any;
  public status: number;

  public arrFilters: any = [];
  public arrInUse: any = [];
  public refreshed: Date;

  constructor(
    private warehouseService: WarehouseService,
    public translate: TranslateService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.router.url == '/api/occupied-matrices' ? this.status = 1 : this.status = 0;
    if(this.status == 0){
      this.displayedColumns = ['resourceName', 'storagePlace', 'partOfGroup', 'diameter', 'thickness', 'size', 'freeCapacity'];
    } else {
      this.displayedColumns = ['resourceName', 'storagePlace', 'partOfGroup', 'matrix', 'diameter', 'countDie', 'capacity'];
    }

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.arrFilters = [
      {id: 0, ind: 0, url: 'ResourceName', name: this.translateSnackBar.resource, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 1, ind: 1, url: 'StoragePlace', name: this.translateSnackBar.place, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      // {id: 2, ind: 2, url: 'ResourceID', name: this.translateSnackBar.partOfGroup, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      // {id: 3, ind: 3, url: 'SingleDie', name: this.translateSnackBar.matrix, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      // {id: 4, ind: 4, url: 'Capacity', name: this.translateSnackBar.diameter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      // {id: 5, ind: 5, url: 'CapacityUoM', name: this.translateSnackBar.thickness, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      // {id: 6, ind: 6, url: 'UsedCapacity', name: this.translateSnackBar.size, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      // {id: 7, ind: 7, url: 'ParentID', name: this.translateSnackBar.place, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    ];
   }

  ngOnInit(): void {
    this.pageChanged(1);
    this.getFilters(this.urls.length, 'init');
  }

  getRequest() {
    this.blockUI.start('Loading...');
    this.warehouseService.getInformationWarehouse(this.offset, this.limit, this.orderType, this.orderBy, this.arrFilters[0].model, this.arrFilters[1].model, this.status).subscribe((data) => {
      this.rows = data.list;
      this.totalResult = data.total;
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
        this.warehouseService.getFilters(this.urls[i].name).subscribe((data) => {
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

  viewDiesList(list){
    if(list.length > 0) {
      const modalRef = this.modalService.open(WarehouseListDieModalComponent, {size : 'md'});
      modalRef.componentInstance.dieItem = { 'list': list };
      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        if (receivedEntry) {}
      });
    } else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.msgEmpty ,
        showConfirmButton: false,
        timer: 2000
      })
      Swal.fire({
        title: this.translateSnackBar.msgEmpty,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
    }

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

  sortType(orderType, ind) {
    console.log('sortType', orderType)
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.getRequest();
  }

  clarAll() {
    this.offset = 0;
    this.limit = 15;
    for(let i=0; i < this.arrFilters.length; i++) {
      this.arrFilters[i].model= '';
    }
    this.getRequest();
    this.getFilters(this.urls.length, 'init');
  }
}
