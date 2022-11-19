import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';

@Component({
  selector: 'app-die-scan-modal',
  templateUrl: './die-scan-modal.component.html',
  styleUrls: ['./die-scan-modal.component.scss']
})
export class DieScanModalComponent implements OnInit {

  @Input() public dieItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['diedId', 'resourceName', 'channels', 'profile', 'inUse',];
  public translateSnackBar: any;
  public loading: boolean;
  public dieId: string = '';
  public barCode: string = ''
  //for pagination
  public cPage: number = 1;
  public limit: number = 10;
  public offset: number = 0;
  public leastDaysAgo = this.limit * this.cPage;
  public totalResult: number = 0;
  public maxSize = 10;
  public itemsPerPage = 10;
  public languageOptions: any;
  public rows: Array<any> = [];
  public selectedRow: any;

  constructor(
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    public dieService: DieConfirmationService,
  ) { }

  ngOnInit(): void {
    this.dieId = this.dieItem.die;
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.pageChanged(1, 10);
  }

  getBarCode(count) {
    this.loading = true;
    this.limit = count;
    this.dieService.getBarCode(this.offset, this.limit, this.dieId).subscribe(data => {
      console.log("getBarCode", data);
      this.rows = data.list;
      this.totalResult = data.total;
      this.loading = false;
    });
  }

  getBarCodesTable(barCode){
    console.log("getBarCodesTable", this.barCode);
    let length = this.barCode.toString().length;
    console.log("length", length);
    if(this.barCode.toString().length == 7){
      this.getBarCode(10);
    }
  }

  pageChanged(page: number, count) {
    console.log('event', page);
    this.cPage = page;
    this.offset = 10 * (this.cPage - 1);
    this.leastDaysAgo = this.limit * this.cPage;
    this.itemsPerPage = count;
    this.getBarCode(count);
  }

  clickedRows(row){
    console.log('clickedRows', row);
    this.selectedRow = row;
    this.activeModal.dismiss();
    this.passEntry.emit(row);
  }

  submit(){
    this.activeModal.dismiss();
    this.passEntry.emit(this.selectedRow);
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

}
