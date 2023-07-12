import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatrixService } from '../../../@core/services/matrix.service';

@Component({
  selector: 'app-productivity-nitrification-page',
  templateUrl: './productivity-nitrification-page.component.html',
  styleUrls: ['./productivity-nitrification-page.component.scss']
})
export class ProductivityNitrificationPageComponent implements OnInit {
  // Public
  public displayedColumns: string[] = ['dieId', 'channels', 'status', 'currentResource', 'totalKgProduced', 'countUsages', 'lastAnodizingDate', 'kGtoNextAnodizing', 'kgAfterLastAnodizing'];
  public urls = [];
  public rows = [{}];
  public size = 13;

  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public totalResult: number = 0;

  public languageOptions: any;
  public loading: boolean = false;
  public translateSnackBar: any;
  public statusId: number;
  public dieId: string = '';
  public primaryResourceName: string = '';
  public channels: string = '';
  public substatus: string = '';
  public arrDies: Array<any> = [];
  public arrChannels: Array<any> = [];
  public arrStatus: Array<any> = [];
  public arrResource: Array<any> = [];

  constructor(
    private matrixService: MatrixService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.pageChanged(1);
    this.getDieID();
    this.getChannels();
    this.getStatusDie();
    this.getCurrentResource();
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  getRequest() {
    this.loading = true;
    this.matrixService.getNitrificationMatrix(
      this.offset,
      this.limit,
      this.dieId,
      this.primaryResourceName,
      this.channels,
      this.substatus
    ).subscribe((data) => {
      this.rows = data.list;
      this.totalResult = data.total;
      this.loading = false;
    });
  }

  getDieID() {
    this.matrixService.getDieID().subscribe((data) => {
      this.arrDies = data;
      console.log(' this.arrDies', this.arrDies);
      this.loading = false;
    });
  }

  getChannels() {
    this.matrixService.getChannelsDie().subscribe((data) => {
      this.arrChannels = data;
      this.loading = false;
    });
  }

  getStatusDie() {
    this.matrixService.getStatusDie().subscribe((data) => {
      this.arrStatus = data;
      this.loading = false;
    });
  }

  getCurrentResource() {
    this.matrixService.getCurrentResource().subscribe((data) => {
      this.arrResource = data;
      this.loading = false;
    });
  }

  pageChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getRequest();
  }
  
  clarAll() {
    this.offset = 0,
    this.limit = 15, 
    this.dieId = '';
    this.primaryResourceName = '';
    this.channels = '';
    this.substatus = '';
    this.getRequest();
  }
}
