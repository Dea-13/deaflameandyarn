import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilesService } from '../../../@core/services/profiles.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProfileModalComponent } from '../../modals/new-profile-modal/new-profile-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-information-profiles',
  templateUrl: './information-profiles.component.html',
  styleUrls: ['./information-profiles.component.scss'],
})
export class InformationProfilesComponent implements OnInit {
  // Public
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
    { id: 0, name: 'profilename/true' },
    { id: 1, name: 'groupcode/true' },
    { id: 2, name: 'section/true' },
    { id: 3, name: 'perimeter/true' },
    { id: 4, name: 'grm/true' },
    { id: 5, name: 'primarypress/true' },
    { id: 6, name: 'alternativepress/true' },
    { id: 7, name: 'size1/true' },
    { id: 8, name: 'size2/true' },
    { id: 9, name: 'size3/true' },
    { id: 10, name: 'size4/true' },
    { id: 11, name: 'usage/true' },
    { id: 12, name: 'extrusionspeed/true' },
    { id: 13, name: 'extrusionspeedsms/true' },
    { id: 14, name: 'opperf/true' },
    { id: 15, name: 'tbillet/true' },
    { id: 16, name: 'texit/true' },
    { id: 17, name: 'puller/true' },
    { id: 18, name: 'scrapstart/true' },
    { id: 19, name: 'scrapstartsms/true' },
    { id: 20, name: 'scrapend/true' },
    { id: 21, name: 'cooling/true' },
    { id: 22, name: 'coolingsms/true' },
    { id: 23, name: 'coolingadd/true' },
    { id: 24, name: 'basketordering/true' },
    { id: 25, name: 'notesextrusion/true' },
    { id: 26, name: 'important/true' },
  ];

  public urlsFilters = [
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
  public profileNameArr: Array<any> = [];
  public groupCodeArr: Array<any> = [];
  public sectionArr: Array<any> = [];
  public perimeterArr: Array<any> = [];
  public grmArr: Array<any> = [];
  public primarypressArr: Array<any> = [];
  public alternativepressArr: Array<any> = [];
  public size1Arr: Array<any> = [];
  public size2Arr: Array<any> = [];
  public size3Arr: Array<any> = [];
  public size4Arr: Array<any> = [];
  public usageArr: Array<any> = [];
  public extrusionspeedArr: Array<any> = [];
  public extrusionspeedsmsArr: Array<any> = [];
  public opperfArr: Array<any> = [];
  public tbilletArr: Array<any> = [];
  public texitArr: Array<any> = [];
  public pullerArr: Array<any> = [];
  public scrapstartArr: Array<any> = [];
  public scrapstartsmsArr: Array<any> = [];
  public scrapendArr: Array<any> = [];
  public coolingArr: Array<any> = [];
  public coolingsmsArr: Array<any> = [];
  public coolingaddArr: Array<any> = [];
  public basketorderingArr: Array<any> = [];
  public notesextrusionArr: Array<any> = [];
  public importantArr: Array<any> = [];

  public selProfileName: string = '';
  public selGroupCode: string = '';
  public selSection: string = '';
  public selPerimeter: string = '';
  public selGrM: string = '';
  public selPrimaryPress: string = '';
  public selAlternativePress: string = '';
  public selSize1: string = '';
  public selSize2: string = '';
  public selSize3: string = '';
  public selSize4: string = '';
  public selUsage: string = '';
  public selExtrusionSpeed: string = '';
  public selExtrusionSpeedSms: string = '';
  public selOpPerf: string = '';
  public selTbillet: string = '';
  public selTExit: string = '';
  public selPuller: string = '';
  public selScrapStart: string = '';
  public selScrapStartSms: string = '';
  public selScrapEnd: string = '';
  public selCooling: string = '';
  public selCoolingSms: string = '';
  public selCoolingAdd: string = '';
  public selBasketOrdering: string = '';
  public selNotesExtrusion: string = '';
  public selImportant: string = '';
  public selInUse: string = '';

  public indColumn: any;
  public orderBy: number = 0;
  public orderType: number = 1; 


  //for pagination
  public cPage: number = 1;
  public limit: number = 10;
  public offset: number = 0;
  public totalResult: number = 0;
  public languageOptions: any;
  public searchMaterial: any = '';
  public loading: boolean = false;
  public translateSnackBar: any;

  constructor(
    private profilesService: ProfilesService,
    public translate: TranslateService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.pageChanged(1);
    this.getFilters();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  getRequest() {
    this.loading = true;
    this.profilesService
      .getInformationProfiles(
        this.offset,
        this.limit,
        this.selProfileName,
        this.selGroupCode,
        this.selSection,
        this.selPerimeter,
        this.selGrM,
        this.selPrimaryPress,
        this.selAlternativePress,
        this.selSize1,
        this.selSize2,
        this.selSize3,
        this.selSize4,
        this.selUsage,
        this.selExtrusionSpeed,
        this.selExtrusionSpeedSms,
        this.selOpPerf,
        this.selTbillet,
        this.selTExit,
        this.selPuller,
        this.selScrapStart,
        this.selScrapStartSms,
        this.selScrapEnd,
        this.selCooling,
        this.selCoolingSms,
        this.selCoolingAdd,
        this.selBasketOrdering,
        this.selNotesExtrusion,
        this.selImportant,
        this.selInUse,
        this.orderType,
        this.orderBy
      )
      .subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.loading = false;
      });
  }

  getFilters() {
    this.loading = true;
    for (let i = 0; i < this.urlsFilters.length; i++) {
      this.profilesService.getFilters(this.urlsFilters[i].name, this.selProfileName, this.selGroupCode, this.selSection, this.selPerimeter, this.selGrM, this.selPrimaryPress, this.selAlternativePress, this.selSize1, this.selSize2, this.selSize3, 
        this.selSize4, this.selUsage, this.selExtrusionSpeed, this.selExtrusionSpeedSms, this.selOpPerf, this.selTbillet, this.selTExit, this.selPuller, this.selScrapStart, this.selScrapStartSms,
        this.selScrapEnd, this.selCooling, this.selCoolingSms, this.selCoolingAdd, this.selBasketOrdering, this.selNotesExtrusion, this.selImportant, this.selInUse
        ).subscribe((data) => {
        switch (this.urlsFilters[i].id) {
          case 0:
            {
              this.profileNameArr = data;
            }
            break;
          case 1:
            {
              this.groupCodeArr = data;
            }
            break;
          case 2:
            {
              this.sectionArr = data;
            }
            break;
          case 3:
            {
              this.perimeterArr = data;
            }
            break;
          case 4:
            {
              this.grmArr = data;
            }
            break;
          case 5:
            {
              this.primarypressArr = data;
            }
            break;
          case 6:
            {
              this.alternativepressArr = data;
            }
            break;
          case 7:
            {
              this.size1Arr = data;
            }
            break;
          case 8:
            {
              this.size2Arr = data;
            }
            break;
          case 9:
            {
              this.size3Arr = data;
            }
            break;
          case 10:
            {
              this.size4Arr = data;
            }
            break;
          case 11:
            {
              this.usageArr = data;
            }
            break;
          case 12:
            {
              this.extrusionspeedArr = data;
            }
            break;
          case 13:
            {
              this.extrusionspeedsmsArr = data;
            }
            break;
          case 14:
            {
              this.opperfArr = data;
            }
            break;
          case 15:
            {
              this.tbilletArr = data;
            }
            break;
          case 16:
            {
              this.texitArr = data;
            }
            break;
          case 17:
            {
              this.pullerArr = data;
            }
            break;
          case 18:
            {
              this.scrapstartArr = data;
            }
            break;
          case 19:
            {
              this.scrapstartsmsArr = data;
            }
            break;
          case 20:
            {
              this.scrapendArr = data;
            }
            break;
          case 21:
            {
              this.coolingArr = data;
            }
            break;
          case 22:
            {
              this.coolingsmsArr = data;
            }
            break;
          case 23:
            {
              this.coolingaddArr = data;
            }
            break;
          case 24:
            {
              this.basketorderingArr = data;
            }
            break;
          case 25:
            {
              this.notesextrusionArr = data;
            }
            break;
          case 26:
            {
              this.importantArr = data;
            }
            break;
        }
        this.loading = false;
      });
    }
  }

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }

  modalProfile(row) {
    console.log('new/edit profile');
    const modalRef = this.modalService.open(NewProfileModalComponent, {});
    modalRef.componentInstance.profileItem = { data: row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest();
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: this.translateSnackBar.saveMsg ,
          showConfirmButton: false,
          timer: 2000
        })
        this.pageChanged(1);
      }
      this.getFilters();
    });
  }

  deleteProfile(row) {
    this.profilesService.deleteProfile(row.id).subscribe(profilesService => {
      this.getRequest();
      this.loading = false;
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
        this.loading = false;
      }
    );
  }

  sortType(column, orderType, ind) {
    console.log('sortType', column, orderType)
    this.loading = true;
    this.indColumn = ind;
    this.orderBy = ind;
    if (orderType == true) {
      this.orderType = 1;
    } else {
      this.orderType = 0;
    }
    this.getRequest();
  }
}
