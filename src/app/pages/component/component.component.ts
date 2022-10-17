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

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @ViewChild('myTable') table: any;
  ColumnMode = ColumnMode;
  subscription: any;
  dataServiceObj: any;
  loading: boolean = false;
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
    this.loading = true;
    this.componentService.getLocationCode(id).subscribe({ next: (data) => {
      this.locationCode.push(data);
      this.locName = data['textValue'];      
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
    },
    complete: () => {}
    });
  }

  getMaterialAndWarehouse(productId, workCenterId) {
    this.loading = true;
    this.componentService.getMaterialAndWarehouse(productId, workCenterId).subscribe({ next: (data) => {
      this.currentStock = data;      
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
    },
    complete: () => {}
    });

  }

  getStockSn(sn, index){
    this.rows[index].sn = sn;
  }

  getPdfPreviewer(confirmId, workCenterId){
    this.loading = true;
    let url;
    if(workCenterId == 17){      
      url = this.componentService.getPdfPreviewer('reportPacketLabel', confirmId)
    } else {      
      url = this.componentService.getPdfPreviewer('reportAutomotivePasivationLabel', confirmId)
    }
    url.subscribe(data => {
      this.pdf = data.fileContents;         
      this.loading = false;
      this.openPdf();
    });
  }

  openPdf(){    
    const modalRef = this.modalService.open(PdfViewerModalComponent, this.modalOption);
    modalRef.componentInstance.pdfItem = { 'pdf': this.pdf};
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        localStorage.removeItem('dataRedirect');
        localStorage.removeItem('dataRedirectConfirmation');
        this.router.navigate(['api/operation/' + JSON.parse(localStorage.getItem('dataRedirectOperation')).id]);
      }
    });
  }

  completeComponent() {
    this.dataServiceObj.cuser = JSON.parse(localStorage.getItem('currentUser')).userName;
    this.dataServiceObj.componentsList = this.rows;    
    this.loading = true;
    // console.log('this.dataServiceObj!!!!!!', this.dataServiceObj.prevOperationCassetList)
    this.componentService.RegisterOrderOperationConfirmationForShopFloor(this.dataServiceObj).subscribe(
      data => {        
        const comformationId = data['id'];
        this.dataServiceObj['comfirmationData'] = data;
        this.componentService.SaveProductionWarehouseTransactionForShopfloor(this.dataServiceObj).subscribe(data => {

          this.loading = false;
          this.toastrService.success(
            'Успешно потвърдихте!',
            '' ,
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
          if(Number(this.dataServiceObj.operation.workCenterId) == 17 || Number(this.dataServiceObj.operation.workCenterId) == 55){
            this.getPdfPreviewer(comformationId, Number(this.dataServiceObj.operation.workCenterId));          
          } else {
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
