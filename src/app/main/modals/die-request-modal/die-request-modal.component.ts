import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DieConfirmationService } from '../../../@core/services/die-confirmation.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-die-request-modal',
  templateUrl: './die-request-modal.component.html',
  styleUrls: ['./die-request-modal.component.scss']
})
export class DieRequestModalComponent implements OnInit {

  @BlockUI('block') blockUI: NgBlockUI;
  @Input() public dieItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public list: Array<any> = [];
  public translateSnackBar: any;
  public fullScr: boolean = false;
  public rows: any = [];
  public userName: any;

  constructor(
    private dieService: DieConfirmationService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
  ) {
    this.userName = JSON.parse(localStorage.getItem('_currentUser')).userName;
  }

  ngOnInit(): void {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.getDieList()
  }

  getDieList() {
    this.blockUI.start('Loading...');
    this.dieService.getDieList(this.dieItem.data.porfile).subscribe((data) => {
      this.rows = data;
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
    });
  }

  sendToPress(row) {
    this.blockUI.start('Loading...');

    let obj = {
      die: 0,
      dieId: row.dieId,
      resourceIn: this.dieItem.data.pressId,
      ResourceOut: row.currentResource,
      storagePlaceIn: null,
      kgProduced: 0,
      notes: row.notes,
      computerName: this.userName,
      emplId: null,
      movementDateTime: new Date()
    }
    console.log('obj', obj);
    this.dieService.postDieMovemanetConf(obj).subscribe(
      (data) => {
        this.changeDieRequest(row);
        this.activeModal.dismiss();
        this.passEntry.emit(true);
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    );
  }

  changeDieRequest(row) {
    console.log('changeDieRequest', row);
    this.blockUI.start('Loading...');

    let obj = {
      id: this.dieItem.data.id,
      porfile: this.dieItem.data.porfile,
      executionPlanDetailsBaseByMachineId: this.dieItem.data.executionPlanDetailsBaseByMachineId,
      ctime: this.dieItem.ctime,
      status: this.dieItem.data.status,
      pressId: this.dieItem.data.pressId
    }
    this.dieService.changeDieRequest(obj).subscribe(
      (data) => {
        this.activeModal.dismiss();
        this.passEntry.emit(true);
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    );
  }

  fullScreen() {
    this.fullScr == false ? this.fullScr = true : this.fullScr = false;
    console.log('this.fullScr', this.fullScr)
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
