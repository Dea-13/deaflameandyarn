import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';

@Component({
  selector: 'app-die-request-page',
  templateUrl: './die-request-page.component.html',
  styleUrls: ['./die-request-page.component.scss']
})
export class DieRequestPageComponent implements OnInit {
 // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = ['porfile', 'ctime'];
  public rows: any;
  public size = 13;
  public languageOptions: any;
  public translateSnackBar: any;

  constructor(
    private dieService: DieConfirmationService,
    public translate: TranslateService,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    console.log('TRANSLATE', this.translateSnackBar);
  }

  ngOnInit(): void {
    this.getRequest();
  }

  getRequest() {
    this.blockUI.start('Loading...');
    this.dieService.getDiesRequest().subscribe((data) => {
      this.rows = data;
      this.blockUI.stop();
    }, error =>{
      this.blockUI.stop();
    });
  }

}
