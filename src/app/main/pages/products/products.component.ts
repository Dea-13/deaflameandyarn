import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProfilesService } from '../../../@core/services/profiles.service';
import { ModalProfileProductsComponent } from '../../modals/modal-profile-products/modal-profile-products.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  // Public
  displayedColumns: string[] = ['erpitem', 'erpvariant', 'opNo', 'cnc1Id', 'cnc2Id', 'subContractor1Id', 'punching1', 'punching2', 'garda3', 'minutesPerPiece', 'weightPerPiece', 'lprkr', 'lobr', 'npr', 'setupSameProfile', 'setupOtherProfile' ];
  public rows = [];
  //for pagination
  public cPage: number = 1;
  public limit: number = 10;
  public offset: number = 0;
  public leastDaysAgo = this.limit * this.cPage;
  public totalResult: number = 0;
  public maxSize = 10;
  public itemsPerPage = 10;
  public languageOptions: any;
  public loading: boolean = false;
  public translateSnackBar: any;

  public urls = [
    { id: 0, name: 'erpitem' },
    { id: 1, name: 'erpvariant' },
    { id: 2, name: 'opNo' },
    { id: 3, name: 'cNC1' },
    { id: 4, name: 'cNC2' },
    { id: 5, name: 'subContractor1' },
    { id: 6, name: 'punching1' },
    { id: 7, name: 'punching2' },
    { id: 8, name: 'garda3' },
    { id: 9, name: 'minutesPerPiece' },
    { id: 10, name: 'weightPerPiece' },
    { id: 11, name: 'lprkr' },
    { id: 12, name: 'lobr' },
    { id: 13, name: 'npr' },
    { id: 14, name: 'setupSameProfile' },
    { id: 15, name: 'setupOtherProfile' },
  ];

  public orderDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false
  };
  public erpitem: string = '';
  public erpvariant: string = '';
  public opNo: string = '';
  public cNC1: string = '';
  public cNC2: string = '';
  public subContractor1: string = '';
  public punching1: string = '';
  public punching2: string = '';
  public garda3: string = '';
  public minutesPerPiece: string = '';
  public weightPerPiece: string = '';
  public lprkr: string = '';
  public lobr: string = '';
  public npr: string = '';
  public setupSameProfile: string = '';
  public setupOtherProfile: string = '';
  public erpitemArr: Array<any> = [];
  public erpvariantArr: Array<any> = [];
  public opNoArr: Array<any> = [];
  public cNC1Arr: Array<any> = [];
  public cNC2Arr: Array<any> = [];
  public subContractor1Arr: Array<any> = [];
  public punching1Arr: Array<any> = [];
  public punching2Arr: Array<any> = [];
  public garda3Arr: Array<any> = [];
  public minutesPerPieceArr: Array<any> = [];
  public weightPerPieceArr: Array<any> = [];
  public lprkrArr: Array<any> = [];
  public lobrArr: Array<any> = [];
  public nprArr: Array<any> = [];
  public setupSameProfileArr: Array<any> = [];
  public setupOtherProfileArr: Array<any> = [];

  constructor(
    private profileService: ProfilesService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) {}

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
    this.profileService.getProfileProduct(
        this.offset,
        this.limit,
        this.erpitem,
        this.erpvariant,
        this.opNo,
        this.cNC1,
        this.cNC2,
        this.subContractor1,
        this.punching1,
        this.punching2,
        this.garda3,
        this.minutesPerPiece,
        this.weightPerPiece,
        this.lprkr,
        this.lobr,
        this.npr,
        this.setupSameProfile,
        this.setupOtherProfile,
      )
      .subscribe((data) => {
        this.rows = data.list;
        this.totalResult = data.total;
        this.loading = false;
      });
  }

  getFilters() {
    this.loading = true;
    for (let i = 0; i < this.urls.length; i++) {
      this.profileService.getProductFilters(this.urls[i].name).subscribe((data) => {
        switch (this.urls[i].id) {
          case 0: { this.erpitemArr = data; }
            break;
          case 1: { this.erpvariantArr = data; }
            break;
          case 2: { this.opNoArr = data; }
            break;
          case 3: { this.cNC1Arr = data; }
            break;
          case 4: { this.cNC2Arr = data; }
            break;
          case 5: { this.subContractor1Arr = data; }
            break;
          case 6: { this.punching1Arr = data; }
            break;
          case 7: { this.punching2Arr = data; }
            break;
          case 8: { this.garda3Arr = data; }
            break;
          case 9: { this.minutesPerPieceArr = data; }
            break;
          case 10: {this.weightPerPieceArr = data; }
            break;
          case 11: { this.lprkrArr = data; }
            break;
          case 12: { this.lobrArr = data; }
            break;
          case 13: { this.nprArr = data; }
            break;
          case 14:{ this.setupSameProfileArr = data;}
            break;
          case 15: { this.setupOtherProfileArr = data; }
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

  modalProducts(row) {
    console.log('new/edit modalProducts');
    const modalRef = this.modalService.open(ModalProfileProductsComponent, {});
    modalRef.componentInstance.productItem = { data: row };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.getRequest();
      }
    });
  }
}
