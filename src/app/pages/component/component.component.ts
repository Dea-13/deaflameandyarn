import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComponentService } from '../../@core/services/component.service';
import { DataService } from '../../@core/services/data.service';
import { Location } from '@angular/common';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModalComponent } from '../pdf-viewer-modal/pdf-viewer-modal.component';
import { ElectronService } from '../../core/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @BlockUI('block') blockUI: NgBlockUI;
  @ViewChild('myTable') table: any;
  ColumnMode = ColumnMode;
  subscription: any;
  dataServiceObj: any;
  rows : any = [];
  pdf: any;
  public selectedOption = 15;
  locationCode: any = [];
  locCode: any;
  currentStock: any;
  currentStock2: any = [];
  inventories: any;
  currentStockValue: any;
  locName: any;
  produced: number;
  scrap: number;
  public modalOption: NgbModalOptions = {};
  myIntervalCloseApp: any;

  constructor(
    private componentService: ComponentService,
    public activatedRoute: ActivatedRoute,
    private data: DataService,
    private location: Location,
    public router: Router,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    public electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.dataServiceObj = JSON.parse(localStorage.getItem('dataRedirectConfirmation'));
    console.log("dataRedirectConfirmation++", this.dataServiceObj, this.dataServiceObj.operation.workCenterId);

    this.scrap = this.dataServiceObj.countBrak != '' ? this.dataServiceObj.countBrak : 0;
    this.produced = this.dataServiceObj.countProduced != '' ? Number(this.dataServiceObj.countProduced) : 0;
    this.getLocationCode(this.dataServiceObj.operation.workCenterId);
    this.getRequest(this.dataServiceObj.operation.id, this.produced, this.scrap);
    this.closeTime();
  }

  getRequest(id, produced, scrap) {

    this.componentService.getComponents(id, produced, scrap).subscribe(data => {
      this.rows = data;
        if(this.rows.length > 0){
          this.componentService.getMaterialInventories(this.rows[0].productId , this.locName).subscribe(data => {
            this.inventories = data;
            this.getMaterialAndWarehouse(this.rows[0].productId, this.dataServiceObj.operation.workCenterId);
              //\TODO трябва да се провери по ObjecttypeId от операциите
            if(this.dataServiceObj.operation.objectTypeID == 4)
            {
              this.currentStock = data.map((element) => {
                return element.lotNo;
              });
            }
          }, error => {
            console.log('error: ', error)
          });
        }
      });
  }

  getLocationCode(id) {
    this.blockUI.start('Loading...');
    this.componentService.getLocationCode(id).subscribe({ next: (data) => {
      this.locationCode.push(data);
      this.locName = data['textValue'];
      this.blockUI.stop();
    },
    error: (err) => {
      this.blockUI.stop();
    },
    complete: () => {}
    });
  }

  getMaterialAndWarehouse(productId, workCenterId) {
    this.blockUI.start('Loading...');
    this.componentService.getMaterialAndWarehouse(productId, workCenterId).subscribe({ next: (data) => {
      this.currentStock = data;
      this.blockUI.stop();
    },
    error: (err) => {
      this.blockUI.stop();
    },
    complete: () => {}
    });

  }

  getStockSn(sn, index){
    this.rows[index].sn = sn;
  }

  getPdfPreviewer(confirmId, workCenterId){
    this.blockUI.start('Loading...');
    let url;
    if(workCenterId == 17){
      url = this.componentService.getPdfPreviewer('reportPacketLabel', confirmId)
    } else {
      url = this.componentService.getPdfPreviewer('reportAutomotivePasivationLabel', confirmId)
    }
    url.subscribe(data => {
      this.pdf = data.fileContents;
      this.blockUI.stop();
      this.openPdf();
    });
  }

  openPdf(){
    const modalRef = this.modalService.open(PdfViewerModalComponent, this.modalOption);
    modalRef.componentInstance.pdfItem = { 'pdf': this.pdf};
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        console.log('CoreConfigService: TUKAAAAA 3')
        localStorage.removeItem('dataRedirect');
        localStorage.removeItem('dataRedirectConfirmation');
        this.router.navigate(['api/operation/' + JSON.parse(localStorage.getItem('dataRedirectOperation')).id]);
      }
    });
  }

  completeComponent() {
    this.dataServiceObj.cuser = JSON.parse(localStorage.getItem('_currentUser')).userName;
    this.dataServiceObj.componentsList = this.rows;
    this.blockUI.start('Loading...');
    // console.log('this.dataServiceObj!!!!!!', this.dataServiceObj.prevOperationCassetList)
    this.componentService.RegisterOrderOperationConfirmationForShopFloor(this.dataServiceObj).subscribe(
      data => {
        const comformationId = data['id'];
        this.dataServiceObj['comfirmationData'] = data;
        this.componentService.SaveProductionWarehouseTransactionForShopfloor(this.dataServiceObj).subscribe(data => {

          this.blockUI.stop();
          this.toastrService.success(
            'Успешно потвърдихте!',
            '' ,
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          if(Number(this.dataServiceObj.operation.workCenterId) == 17 || Number(this.dataServiceObj.operation.workCenterId) == 55){
            this.getPdfPreviewer(comformationId, Number(this.dataServiceObj.operation.workCenterId));
          } else {
            console.log('CoreConfigService: TUKAAAAA 6')
            localStorage.removeItem('dataRedirect');
            localStorage.removeItem('dataRedirectConfirmation');
            this.router.navigate(['api/operation/' + JSON.parse(localStorage.getItem('dataRedirectOperation')).id]);
          }

        });
      }
    );
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  backClicked() {
    this.location.back();
  }

  closeTime() {
    if (this.electronService.isElectron) {
      this.myIntervalCloseApp = setInterval(() => {
        this.electronService.closeWindows()
      }, 600000);
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    clearInterval(this.myIntervalCloseApp);
  }
}
