import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

}
