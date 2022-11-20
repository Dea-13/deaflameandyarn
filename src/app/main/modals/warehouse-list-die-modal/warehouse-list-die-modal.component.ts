import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-warehouse-list-die-modal',
  templateUrl: './warehouse-list-die-modal.component.html',
  styleUrls: ['./warehouse-list-die-modal.component.scss']
})
export class WarehouseListDieModalComponent implements OnInit {

  @Input() public dieItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  list: Array<any> = [];
  public translateSnackBar: any;

  constructor(
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.list = this.dieItem.list;

    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

}
