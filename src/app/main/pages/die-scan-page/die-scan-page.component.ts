import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';
import { DieScanModalComponent } from '../../modals/die-scan-modal/die-scan-modal.component';

@Component({
  selector: 'app-die-scan-page',
  templateUrl: './die-scan-page.component.html',
  styleUrls: ['./die-scan-page.component.scss']
})
export class DieScanPageComponent implements OnInit {

  displayedColumns: string[] = ['dieId', 'resourceIn', 'resourceOut', 'movementDateTime', 'notes', 'computerName',];
  displayedColumnsDie: string[] = ['matrix', 'skladPlace', 'lastTransaction',];
  public loading: boolean;
  public translateSnackBar: any;
  public rowsMovements: Array<any> = [];
  public rowsDie: Array<any> = [];

  public diedId: string = '';
  public barCode: string = '';
  public image: any = { name: ''};
  public lastMovements: Array<any> = [];
  public resource: Array<any> = [];
  public employee: Array<any> = [];
  public resourceIn: number;
  public currentResource: number;

  constructor(
    public translate: TranslateService,
    public dieService: DieConfirmationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.getResource();
    this.getEmployee();
  }

  getResource(){
    this.dieService.getResource().subscribe(data => {
      console.log("getBarCode", data);
      this.resource = data;
      this.loading = false;
    });
  }

  getEmployee(){
    this.dieService.getEmployee().subscribe(data => {
      console.log("getEmployee", data);
      this.employee = data;
      this.loading = false;
    });
  }

  getImage(row) {
    this.loading = true;
    this.dieService.getImage(row.profile).subscribe(data => {
      console.log("getImage", data);
      this.image = data;
      this.loading = false;
    });
  }

  getMovements(resourceIn) {
    this.loading = true;
    this.dieService.getMovements(resourceIn).subscribe(data => {
      console.log("getMovements", data);
      this.rowsMovements = data;
      this.loading = false;
    });
  }

  getBarCodesTable(barCode, event){
    console.log("getBarCodesTable", this.barCode, event);
    let length = this.barCode.toString().length;
    console.log("length", length);
    if(this.barCode.toString().length == 7){
      this.openBarCodeModal();
    }
  }

  openBarCodeModal(){
    console.log('new/edit profile');
    const modalRef = this.modalService.open(DieScanModalComponent, {});
    modalRef.componentInstance.dieItem = { 'die': this.barCode };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {
        this.getImage(receivedEntry);
        this.currentResource = receivedEntry.resourceIn;
      }
    });
  }

  lastMovementRow(row){

  }

}
