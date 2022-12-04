import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatrixService } from '../../../@core/services/matrix.service';

@Component({
  selector: 'app-details-die-modal',
  templateUrl: './details-die-modal.component.html',
  styleUrls: ['./details-die-modal.component.scss']
})
export class DetailsDieModalComponent implements OnInit {

  @Input() public dieItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  displayedColumnsProduction: string[] = [
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
    'customerName',  'computerName',
    'remainingQty', 'color'
  ];
  displayedColumnsMovements: string[] = ['resourceIn', 'resourceOut', 'movementDateTime', 'notes', 'empName', 'computerName'];
  displayedColumnsEscData: string[] = ['press', 'id', 'batch', 'billetLength', 'blletButtLength', 'pullerSpeed', 'billetTemperature', 'exitTemperature', 'kggross', 'pressure', 'containerTemp', 'extrEndTime'];
  public translateSnackBar: any;
  public loading: boolean = false;
  public image: any = { 'name': '' };
  public active = 1;
  public dieRow: any;
  public extrusion: any;
  public movements: Array<any> = [];
  public extrData: Array<any> = [];
  sumTotalKg: number = 0;
  sumtotalUsed: number = 0;
  resourceName: string = '';
  inUseFrom: string = '';
  emptyDataHeader: boolean = false;

  constructor(
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private matrixService: MatrixService,
  ) { }

  ngOnInit(): void {
    this.dieRow = this.dieItem.data;
    console.log("this.dieRow", this.dieRow);
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.getExtrusion();
    this.getImage();
    this.getMovements();
    this.getHeaderDetails();
  }

  getExtrusion() {
    this.loading = true;
    this.matrixService.getExtrusion(this.dieRow.id).subscribe(data => {
      console.log("getExtrusion", data);
      this.extrusion = data;
      this.loading = false;
    });
  }

  getImage() {
    this.loading = true;
    this.matrixService.getImage(this.dieRow.profile).subscribe(data => {
      console.log("getImage", data);
      this.image = data;
      this.loading = false;
    });
  }

  getMovements() {
    this.loading = true;
    this.matrixService.getMovements(this.dieRow.id).subscribe(data => {
      console.log("getMovements", data);
      this.movements = data;
      this.loading = false;
    });
  }

  getHeaderDetails() {
    this.loading = true;
    this.matrixService.getHeaderDetails(this.dieRow.id).subscribe(data => {
      console.log("getHeaderDetails", data);
      if(data.length > 0){
        for(let i=0; i < data.length; i++){
          this.sumTotalKg = this.sumTotalKg + data[i].totalKg;
          this.sumtotalUsed = this.sumtotalUsed + data[i].totalUsed;
          this.resourceName = this.resourceName.concat(data[i].resourceName).concat("(").concat(data[i].totalUsed).concat(")").concat(", ");
          this.inUseFrom = data[data.length-1].inUseFrom;
        }
      } else {
        this.emptyDataHeader = true;
      }

      console.log("this.headerDetails", this.sumTotalKg, this.sumtotalUsed, this.resourceName, this.inUseFrom);
      this.loading = false;
    });
  }

  getExtrusionData(row){
    console.log("getExtrusionData", row);
    this.matrixService.getExtrusionData(row.batchId).subscribe(data => {
      console.log("getExtrusionData", data);
      this.extrData = data;
      this.loading = false;
    }, error=>{
      this.extrData = [];
    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

}
