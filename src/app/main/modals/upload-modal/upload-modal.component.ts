import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MatrixService } from '../../../@core/services/matrix.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

  public uploadForm: UntypedFormGroup;
  public submitted = false;
  public die: any;
  private unsubscribeAll: Subject<any>;
  public files: any;
  public filesUpload: any = [];
  public translateSnackBar: any;
  public userName: any;
  public documentName: any;

  @Input() public uploadItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(private matrixService: MatrixService,
    private activeModal: NgbActiveModal,
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService,
    public translate: TranslateService) {
      this.userName = JSON.parse(localStorage.getItem('_currentUser')).userName;
    }

  ngOnInit(): void {
    console.log('this.uploadItem', this.uploadItem);
    this.submitted = false;

    this.translate.get('translate').subscribe((snackBar: string) => {
      console.log('snackBar', snackBar);
      this.translateSnackBar = snackBar;
    });

    this.uploadForm = this.formBuilder.group({
      // fileName: ['', []],
      // file: ['', [Validators.required]],
    });
    this.unsubscribeAll = new Subject();
  }

  submitForm(die) {
    this.submitted = true;
    if(this.filesUpload.length > 0){
      if (!this.uploadForm.invalid) {
        console.log('this.filesUpload', this.filesUpload);
        for (let i = 0; i < this.filesUpload.length; i++) {
          if(this.filesUpload[i].name.length >= 50){
            this.toastrService.error(
              this.filesUpload[i].name + this.translateSnackBar.longMgs,
            );
            return;
          }
        }
        this.matrixService.uploadFile(this.uploadItem.dieId, this.userName, this.filesUpload).subscribe(data => {
          this.toastrService.success(
            this.translateSnackBar.recordSuccess,
          );
          this.activeModal.dismiss();
          this.passEntry.emit(true);
        });
      }
    }else{
      this.toastrService.error(
        this.translateSnackBar.fileRequired,
      );
    }
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;
      for(let i = 0; i<files.length; i++){
        this.filesUpload.push(files[i]);

        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.documentName = event.target.result;
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeCurrentFile(row){
    var index = this.filesUpload.indexOf(row);
    this.filesUpload.splice(index, 1);
  }

  closeModal(): void {
    this.passEntry.emit(true);
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.complete();
  }

}
