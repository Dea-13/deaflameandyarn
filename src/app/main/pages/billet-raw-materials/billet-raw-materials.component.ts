import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BilletRawMaterialsService } from '../../../@core/services/billet-materials.servise';

@Component({
  selector: 'app-billet-raw-materials',
  templateUrl: './billet-raw-materials.component.html',
  styleUrls: ['./billet-raw-materials.component.scss']
})
export class BilletRawMaterialsComponent implements OnInit {
 // Public
 displayedColumn: string[] = [
  'name', 'description', 'lotNo',
  'variant', 'stockQuantity', 'uom',
  'diameter'];

public rows = [{}];
public languageOptions: any;
public loading: boolean = false;
public translateSnackBar: any;


constructor(
  private billteService: BilletRawMaterialsService,
  public translate: TranslateService,
) { }

ngOnInit(): void {
  this.loading = true;
  this.getRequest();
  this.translate.get('translate').subscribe((snackBar: string) => {
    this.translateSnackBar = snackBar;
  });
}

getRequest() {
  this.loading = true;
  this.billteService.getBilletMaterial().subscribe((data) => {
    this.rows = data;
    this.loading = false;
  });
}

}
