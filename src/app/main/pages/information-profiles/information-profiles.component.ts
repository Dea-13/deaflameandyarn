import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilesService } from '../../../@core/services/profiles.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProfileModalComponent } from '../../modals/new-profile-modal/new-profile-modal.component';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-information-profiles',
  templateUrl: './information-profiles.component.html',
  styleUrls: ['./information-profiles.component.scss'],
})
export class InformationProfilesComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = [
    'profileName',
    'groupCode',
    'section',
    'perimeter',
    'grM',
    'primaryPress',
    'alternativePress',
    'size1',
    'size2',
    'size3',
    'size4',
    'usage',
    'extrusionSpeed',
    'extrusionSpeedSms',
    'opPerf',
    'tbillet',
    'tExit',
    'puller',
    'scrapStart',
    'scrapStartSms',
    'scrapEnd',
    'cooling',
    'coolingSms',
    'coolingAdd',
    'basketOrdering',
    'notesExtrusion',
    'important',
    'inUse',
    'star'
  ];

  public urls = [
    { id: 0, name: 'profilename' },
    { id: 1, name: 'groupcode' },
    { id: 2, name: 'section' },
    { id: 3, name: 'perimeter' },
    { id: 4, name: 'grm' },
    { id: 5, name: 'primarypress' },
    { id: 6, name: 'alternativepress' },
    { id: 7, name: 'size1' },
    { id: 8, name: 'size2' },
    { id: 9, name: 'size3' },
    { id: 10, name: 'size4' },
    { id: 11, name: 'usage' },
    { id: 12, name: 'extrusionspeed' },
    { id: 13, name: 'extrusionspeedsms' },
    { id: 14, name: 'opperf' },
    { id: 15, name: 'tbillet' },
    { id: 16, name: 'texit' },
    { id: 17, name: 'puller' },
    { id: 18, name: 'scrapstart' },
    { id: 19, name: 'scrapstartsms' },
    { id: 20, name: 'scrapend' },
    { id: 21, name: 'cooling' },
    { id: 22, name: 'coolingsms' },
    { id: 23, name: 'coolingadd' },
    { id: 24, name: 'basketordering' },
    { id: 25, name: 'notesextrusion' },
    { id: 26, name: 'important' },
  ];

  public rows = [{}];
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
  public searchMaterial: any = '';
  public translateSnackBar: any;

  public arrFilters: any = [];
  public arrInUse: any = [];
  public refreshed: Date;
  public count: number = 0;
  public countTable: number = 0;;

  constructor(
    private profilesService: ProfilesService,
    public translate: TranslateService,
    private modalService: NgbModal
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.arrFilters = [
      {id: 0, ind: 0, url: 'profilename', name: this.translateSnackBar.profileName, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 1, ind: 1, url: 'groupcode', name: this.translateSnackBar.groupCode, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 2, ind: 2, url: 'section', name: this.translateSnackBar.section, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 3, ind: 3, url: 'perimeter', name: this.translateSnackBar.perimeter, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 4, ind: 4, url: 'grm', name: this.translateSnackBar.grM, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 5, ind: 5, url: 'primarypress', name: this.translateSnackBar.primaryPress, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 6, ind: 6, url: 'alternativepress', name: this.translateSnackBar.alternativePress, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 7, ind: 7, url: 'size1', name: this.translateSnackBar.size1, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 8, ind: 8, url: 'size2', name: this.translateSnackBar.size2, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 9, ind: 9, url: 'size3', name: this.translateSnackBar.size3, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 10, ind: 10, url: 'size4', name: this.translateSnackBar.size4, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 11, ind: 11, url: 'usage', name: this.translateSnackBar.usage, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 12, ind: 12, url: 'extrusionspeed', name: this.translateSnackBar.extrusionSpeed, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 13, ind: 13, url: 'extrusionspeedsms', name: this.translateSnackBar.extrusionSpeedSms, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 14, ind: 14, url: 'opperf', name: this.translateSnackBar.opPerf, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 15, ind: 15, url: 'tbillet', name: this.translateSnackBar.tbillet, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 16, ind: 16, url: 'texit', name: this.translateSnackBar.tExit, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 17, ind: 17, url: 'puller', name: this.translateSnackBar.puller, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 18, ind: 18, url: 'scrapstart', name: this.translateSnackBar.scrapStart, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 19, ind: 19, url: 'scrapstartsms', name: this.translateSnackBar.scrapStartSms, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 20, ind: 20, url: 'scrapend', name: this.translateSnackBar.scrapEnd, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 21, ind: 21, url: 'cooling', name: this.translateSnackBar.cooling, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 22, ind: 22, url: 'coolingsms', name: this.translateSnackBar.coolingSms, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 23, ind: 23, url: 'coolingadd', name: this.translateSnackBar.coolingAdd, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 24, ind: 24, url: 'basketordering', name: this.translateSnackBar.basketOrdering, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 25, ind: 25, url: 'notesextrusion', name: this.translateSnackBar.notesExtrusion, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 26, ind: 26, url: 'important', name: this.translateSnackBar.important, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 27, ind: 27, url: 'inUse', name: this.translateSnackBar.inUse, model: '', filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    ];

    this.arrInUse = [
      {id: 27, ind: 27, name: this.translateSnackBar.checked, model: true, filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
      {id: 27, ind: 27, name: this.translateSnackBar.unChecked, model: false, filter: '', fullFilter: '', temp: '', selectAll: false, disableScroll: '', searchFilterConf: ''},
    ]
   }

  ngOnInit(): void {
    this.getFilters(this.urls.length, 'init');
    this.pageChanged(1);
  }

  getRequest() {
    this.countTable = 0;
    this.blockUI.start('Loading...');
    this.profilesService.getInformationProfiles(
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
      this.orderType,
      this.orderBy
    ).subscribe((data) => {
      this.rows = data.list;
      this.totalResult = data.total;
      this.countTable++;
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
        this.profilesService.getFilters(
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
          this.arrFilters[27].model).subscribe((data) => {
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
          // console.log('data 4=>', this.arrFilters, this.arrFilters.length+1);
          this.arrFilters[27].filter = this.arrInUse;
          this.arrFilters[27].fullFilter = this.arrInUse;
          this.arrFilters[27].temp = this.arrInUse;
          this.arrFilters[27].disableScroll = false;
          this.arrFilters[27].searchFilterConf= '';
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

  modalProfile(row) {
    console.log('new/edit profile');
    const modalRef = this.modalService.open(NewProfileModalComponent, {size : 'xl'});
    modalRef.componentInstance.profileItem = { data: row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg ,
          showConfirmButton: false,
          timer: 2000
        })
      }
      this.getFilters(this.urls.length, 'edit');
      this.pageChanged(1);
    });
  }

  deleteProfile(row) {
    this.profilesService.deleteProfile(row.id).subscribe(profilesService => {
      this.pageChanged(1);
      this.blockUI.stop();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: this.translateSnackBar.deleteMsg,
        showConfirmButton: false,
        timer: 2000
      })
    },
      (error) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 2000
        })
        this.blockUI.stop();
      }
    );
  }

  sortType(orderType, ind) {
    console.log('sortType', orderType)
    this.indColumn = ind;
    this.orderBy = ind;
    orderType == true ? this.orderType = 1 : this.orderType = 0;
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
    return;
  }

  clearFilter(filter, ind) {
    let fullArray = [];
    for(let l=0; l < filter.length; l++) {
      if(l <= 20) { fullArray.push(filter[l]) }
    }
    this.arrFilters[ind].searchFilterConf = '';
    this.arrFilters[ind].filter = fullArray;
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
      this.arrFilters[i].selectAll = false;
    }
    this.pageChanged(1);
    this.getFilters(this.urls.length, 'init');
  }
}
