import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from '../../../@core/services/confirmation.service';

@Component({
  selector: 'app-confirmation-extrusion',
  templateUrl: './confirmation-extrusion.component.html',
  styleUrls: ['./confirmation-extrusion.component.scss']
})
export class ConfirmationExtrusionComponent implements OnInit {
  // Public
  displayedColumn: string[] = [
    'pullerSpeed', 'billetTemperature', 'exitTemperature',
    'dieStatus', 'lengthFinalPiece', 'kgnet',
    'kggross', 'modifiedOn', 'batchId',
    'firstBilletCounter', 'lastBilletcounter', 'billetMaterial',
    'productionOrder', 'billetPcs', 'extrusionLength',
    'piecesExtrusion', 'die', 'prodOrderQty',
    'remarks', 'remarksQc', 'startTime',
    'postingDate', 'lengthSeconds', 'alloy',
    'numberOfEmployees', 'workstation',
    'resource', 'orderAlloy',
    'matrix', 'profile', 'length',
    'temper', 'salesOrder', 'salesOrderItem',
    'customerName', 'computerName',
    'remainingQty', 'color'
  ];

  public rows = [{}];
  public languageOptions: any;
  public loading: boolean = false;
  public translateSnackBar: any;


  constructor(
    private confService: ConfirmationService,
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
    this.confService.getConfExtrusion().subscribe((data) => {
      this.rows = data;
      this.loading = false;
    });
  }

}
