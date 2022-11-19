import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';

@Component({
  selector: 'app-die-scan-page',
  templateUrl: './die-scan-page.component.html',
  styleUrls: ['./die-scan-page.component.scss']
})
export class DieScanPageComponent implements OnInit {

  displayedColumns: string[] = [];
  displayedColumnsDie: string[] = ['matrix', 'skladPlace', 'lastTransaction',];
  public loading: boolean;
  public translateSnackBar: any;
  public rowsMovements: Array<any> = [];
  public rowsDie: Array<any> = [];

  //for pagination
  public cPage: number = 1;
  public limit: number = 10;
  public offset: number = 0;
  public leastDaysAgo = this.limit * this.cPage;
  public totalResult: number = 0;
  public maxSize = 10;
  public itemsPerPage = 10;
  public languageOptions: any;
  public searchMaterial: any = '';
  public diedId: string = '';
  public barCode: Array<any> = [];
  public image: any;
  public lastMovements: Array<any> = [];

  constructor(
    public translate: TranslateService,
    public dieService: DieConfirmationService
  ) { }

  ngOnInit(): void {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.pageChanged(1, 10);
  }

  getBarCode(count) {
    this.loading = true;
    this.limit = count;
    this.dieService.getBarCode(this.offset, this.limit, this.diedId).subscribe(data => {
      console.log("getBarCode", data);
      this.barCode = data;
      this.loading = false;
    });
  }

  pageChanged(page: number, count) {
    console.log('event', page);
    this.cPage = page;
    this.offset = 10 * (this.cPage - 1);
    this.leastDaysAgo = this.limit * this.cPage;
    this.itemsPerPage = count;
    this.getBarCode(count);
  }

  getImage() {
    this.loading = true;
    this.dieService.getImage(7579).subscribe(data => {
      console.log("getImage", data);
      this.image = data;
      this.loading = false;
    });
  }

  getMovements() {
    this.loading = true;
    this.dieService.getMovements(9).subscribe(data => {
      console.log("getMovements", data);
      this.lastMovements = data;
      this.loading = false;
    });
  }

}
