import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from '../../../@core/services/confirmation.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-confirmation-extrusion',
  templateUrl: './confirmation-extrusion.component.html',
  styleUrls: ['./confirmation-extrusion.component.scss']
})
export class ConfirmationExtrusionComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
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
  public translateSnackBar: any;


  constructor(
    private confService: ConfirmationService,
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
    this.confService.getConfExtrusion().subscribe((data) => {
      this.rows = data;
      this.blockUI.stop();
    });
  }

}
