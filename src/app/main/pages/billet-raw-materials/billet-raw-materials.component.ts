import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BilletRawMaterialsService } from '../../../@core/services/billet-materials.servise';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-billet-raw-materials',
  templateUrl: './billet-raw-materials.component.html',
  styleUrls: ['./billet-raw-materials.component.scss']
})
export class BilletRawMaterialsComponent implements OnInit {
 // Public
 @BlockUI('block') blockUI: NgBlockUI;
 displayedColumn: string[] = [
  'name', 'description', 'lotNo',
  'variant', 'stockQuantity', 'uom',
  'diameter'];

public rows = [{}];
public languageOptions: any;
public translateSnackBar: any;


constructor(
  private billteService: BilletRawMaterialsService,
  public translate: TranslateService,
) { }

ngOnInit(): void {
  this.getRequest();
  this.translate.get('translate').subscribe((snackBar: string) => {
    this.translateSnackBar = snackBar;
  });
}

getRequest() {
  this.blockUI.start('Loading...');
  this.billteService.getBilletMaterial().subscribe((data) => {
    this.rows = data;
    this.blockUI.stop();
  });
}

}
