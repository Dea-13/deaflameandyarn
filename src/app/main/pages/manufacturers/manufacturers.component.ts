import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ManufacturersService } from '../../../@core/services/manufacturers.service';
import { NewManufacturersModalComponent } from '../../modals/new-manufacturers-modal/new-manufacturers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = ['name', 'email', 'defaultShipmentTerms', 'star'];
  public rows = [];
  public size = 13;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;
  public translateSnackBar: any;

  public urls = [
    { id: 0, name: 'name' },
    { id: 1, name: 'email' },
    { id: 2, name: 'shipment' },
  ];
  public arrFilters: any = [];
  public refreshed: Date;
  public orderBy: number = 0;
  public orderType: number = 1;
  public indColumn: any;
  public count: number = 0;
  public countTable: number = 0;

  constructor(
    private manufacturerService: ManufacturersService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    console.log('TRANSLATE', this.translateSnackBar);

    this.arrFilters = [
      {id: 0, ind: 0, url: 'name', name: this.translateSnackBar.name, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 1, ind: 1, url: 'email', name: this.translateSnackBar.email, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 2, ind: 2, url: 'shipment', name: this.translateSnackBar.defaultShipmentTerms, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    ];
  }

  ngOnInit(): void {
    this.pageChanged(1);
    this.getFilters(this.urls.length, 'init');
  }

  getRequest() {
    this.countTable = 0;
    this.blockUI.start('Loading...');
    this.manufacturerService.getManufacturers(
      this.offset,
      this.limit,
      this.arrFilters[0].model,
      this.arrFilters[1].model,
      this.arrFilters[2].model,
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
        this.manufacturerService.getFilters(this.urls[i].name, this.arrFilters[0].model, this.arrFilters[1].model, this.arrFilters[2].model).subscribe((data) => {
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
    // this.blockUI.start('Loading...');
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.pageChanged(1);
  }

  modalManufacturer(row) {
    console.log("new/edit manufacturer");
    const modalRef = this.modalService.open(NewManufacturersModalComponent, {size : 'md'});
    modalRef.componentInstance.manufacturerItem = { 'data': row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.pageChanged(1);
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg ,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  }

  deleteManufacturer(row) {
    this.blockUI.start('Loading...');
    this.manufacturerService.deleteManufacturers(row.id).subscribe(manufacturerService => {
      this.pageChanged(1);
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg ,
        showConfirmButton: false,
        timer: 2000
      })
      this.blockUI.stop();
    },
      (error) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.deleteMsg ,
          showConfirmButton: false,
          timer: 2000
        })
        this.blockUI.stop();
        this.pageChanged(1);
      }
    );
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

  clearAll() {
    this.offset = 0;
    this.limit = 15;
    this.orderBy = 0;
    this.orderType = 1;
    for(let i=0; i < this.arrFilters.length; i++) {
      this.arrFilters[i].model= '';
    }
    this.pageChanged(1);
    this.getFilters(this.urls.length, 'init');
  }
}
