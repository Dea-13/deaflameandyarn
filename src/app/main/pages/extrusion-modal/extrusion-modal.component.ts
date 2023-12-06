import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { MatrixService } from '../../../@core/services/matrix.service';

@Component({
  selector: 'app-extrusion-modal',
  templateUrl: './extrusion-modal.component.html',
  styleUrls: ['./extrusion-modal.component.scss']
})
export class ExtrusionModalComponent implements OnInit {
  @Input() public extrItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  displayedColumnsEscData: string[] = ['press', 'id', 'batch', 'billetLength', 'blletButtLength', 'pullerSpeed', 'billetTemperature', 'exitTemperature', 'kggross', 'pressure', 'containerTemp', 'extrEndTime'];

  public translateSnackBar: any;
  public fullScr: boolean = false;
  public userName: any;
  public extrData: Array<any> = [];

  constructor(
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private matrixService: MatrixService,
    private modalService: NgbModal,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.userName = JSON.parse(localStorage.getItem('_currentUser')).userName;
   }

  ngOnInit(): void {
    this.extrData = this.extrItem.data;
  }

  fullScreen(){
    this.fullScr == false ? this.fullScr = true : this.fullScr = false;
    console.log('this.fullScr', this.fullScr)
  }

  closeModal(): void {
    this.passEntry.emit(false);
    this.activeModal.dismiss();
  }

}
