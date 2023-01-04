import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  displayedColumns: string[] = ['dieId', 'resourceName', 'channels', 'inUse',];
  public translateSnackBar: any;
  public loading: boolean;
  public dieId: string = '';
  //for pagination
  public cPage: number = 1;
  public limit: number = 10;
  public offset: number = 0;
  public totalResult: number = 0;
  public rows: Array<any> = [];
  public primaryResourceName: string = '';
  public channels: string = '';
  public channelsArr: Array<any> = [];
  public primaryResourceNameArr: Array<any> = [];
  public dieArr: Array<any> = [];

  constructor(
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    public dieService: DieConfirmationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('dieItem', this.dieItem);
    this.dieId = this.dieItem.die == 'empty' ? '' : this.dieItem.die;
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    this.getBarCode();
    this.getDies();
    this.getChannels();
    this.primaryResource();
  }

  getBarCode() {
    this.loading = true;
    this.dieService.getBarCode(this.offset, this.limit, this.dieId, this.primaryResourceName, this.channels).subscribe(data => {
      console.log("getBarCode", data);
      this.rows = data['list'];
      this.totalResult = data['total'];
      this.loading = false;
    });
  }

  getDies() {
    this.loading = true;
    this.dieService.getDies().subscribe(data => {
      console.log("getDies", data);
      this.dieArr = data;
      this.loading = false;
    });
  }

  getChannels() {
    this.loading = true;
    this.dieService.getChannels().subscribe(data => {
      console.log("getChannels", data);
      this.channelsArr = data;
      this.loading = false;
    });
  }

  primaryResource() {
    this.loading = true;
    this.dieService.primaryResource().subscribe(data => {
      console.log("primaryResource", data);
      this.primaryResourceNameArr = data;
      this.loading = false;
    });
  }

  pageDieChanged(page: number) {
    console.log('event', page);
    this.cPage = page;
    this.offset = this.limit * (this.cPage - 1);
    this.getBarCode();
  }

  clickedRows(row) {
    console.log('clickedRows', row);
    this.activeModal.dismiss();
    this.passEntry.emit(row);
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

}
