import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProfilesService } from '../../../@core/services/profiles.service';
import { ModalProfileProductsComponent } from '../../modals/modal-profile-products/modal-profile-products.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = ['erpitem', 'erpvariant', 'opNo', 'cnc1Id', 'cnc2Id', 'subContractor1Id', 'punching1', 'punching2', 'garda3', 'minutesPerPiece', 'weightPerPiece', 'lprkr', 'lobr', 'npr', 'setupSameProfile', 'setupOtherProfile' ];
  public rows = [];
  public size = 13;
  public indColumn: any;
  public orderBy: number = 0;
  public orderType: number = 1;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;
  public languageOptions: any;
  public translateSnackBar: any;

  public urls = [
    { id: 0, name: 'Erpitem' },
    { id: 1, name: 'Erpvariant' },
    { id: 2, name: 'OpNo' },
    { id: 3, name: 'Cnc1Id' },
    { id: 4, name: 'Cnc2Id' },
    { id: 5, name: 'SubContractor1Id' },
    { id: 6, name: 'Punching1' },
    { id: 7, name: 'Punching2' },
    { id: 8, name: 'Garda3' },
    { id: 9, name: 'MinutesPerPiece' },
    { id: 10, name: 'WeightPerPiece' },
    { id: 11, name: 'Lprkr' },
    { id: 12, name: 'Lobr' },
    { id: 13, name: 'Npr' },
    { id: 14, name: 'SetupOtherProfile' },
    { id: 15, name: 'SetupSameProfile' },
  ];

  public orderDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };

  public arrFilters: any = [];
  public refreshed: Date;

  constructor(
    private profileService: ProfilesService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.arrFilters = [
      {id: 0, ind: 0, url: 'Erpitem', name: this.translateSnackBar.erpItem, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 1, ind: 1, url: 'Erpvariant', name: this.translateSnackBar.erpVariant, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 2, ind: 2, url: 'OpNo', name: this.translateSnackBar.opNo, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 3, ind: 3, url: 'Cnc1Id', name: this.translateSnackBar.cnc1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 4, ind: 4, url: 'Cnc2Id', name: this.translateSnackBar.cnc2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 5, ind: 5, url: 'SubContractor1Id', name: this.translateSnackBar.subContractor1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 6, ind: 6, url: 'Punching1', name: this.translateSnackBar.punching1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 7, ind: 7, url: 'Punching2', name: this.translateSnackBar.punching2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 8, ind: 8, url: 'Garda3', name: this.translateSnackBar.garda3, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 9, ind: 9, url: 'MinutesPerPiece', name: this.translateSnackBar.minutesPerPiece, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 10, ind: 10, url: 'WeightPerPiece', name: this.translateSnackBar.weightPerPiece, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 11, ind: 11, url: 'Lprkr', name: this.translateSnackBar.lprkr, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 12, ind: 12, url: 'Lobr', name: this.translateSnackBar.lobr, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 13, ind: 13, url: 'Npr', name: this.translateSnackBar.npr, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 14, ind: 14, url: 'SetupOtherProfile', name: this.translateSnackBar.setupSameProfile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 15, ind: 15, url: 'SetupSameProfile', name: this.translateSnackBar.setupOtherProfile, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    ];
  }

  ngOnInit(): void {
    this.pageChanged(1);
    this.getFilters(this.urls.length, 'init');
  }

  getRequest() {
    this.blockUI.start('Loading...');
    this.profileService.getProfileProduct(
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
        this.orderType,
        this.orderBy
      )
      .subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.blockUI.stop();
      });
  }

  getFilters(ind, action) {
    console.log('getFilters', this.arrFilters);
    let count = 0;
    let url;
    for (let i = 0; i < this.urls.length; i++) {
      if(ind != this.urls[i].id) {
        let array = [];
        count++;
        this.profileService.getProductFilters(this.urls[i].name,
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
          this.arrFilters[15].model
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
            // console.log('data 4=>', data);
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

  modalProducts(row) {
    console.log('new/edit modalProducts');
    const modalRef = this.modalService.open(ModalProfileProductsComponent, {size : 'md'});
    modalRef.componentInstance.productItem = { data: row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest();
      }
    });
  }

  sortType(orderType, ind) {
    console.log('sortType', orderType, ind)
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
    this.getRequest();
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
        selected.push(array[i].name);
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
}
