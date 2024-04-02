import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RecipeService } from '../../../@core/services/recipe.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecipeComponent implements OnInit {
  // Public
  @BlockUI('block') blockUI: NgBlockUI;
  displayedColumns: string[] = ['star', 'recipeName', 'dieLiveQty'];
  public expanded: boolean = false;
  public expandedElement: [] | null;
  public rows: any = [];
  public size = 13;
  //for pagination
  public cPage: number = 1;
  public limit: number = 15;
  public offset: number = 0;
  public translateSnackBar: any;
  public subRecipees: any = [];
  currentRowSelected: any;
  public edit = {};

  constructor(
    private recipeService: RecipeService,
    public translate: TranslateService,
    private modalService: NgbModal,
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    this.blockUI.start('Loading...');
    this.recipeService.getRecipe().subscribe((data) => {
      this.rows = data;
      this.expandedElement = this.rows;
      this.blockUI.stop();
    }, error =>{
      this.blockUI.stop();
    });
  }

  createRecipe() {
    console.log('createRecipe');
    let recipeName;
    let dieLiveQty;
    Swal.fire({
      // title: this.translateSnackBar.recipeName,
      html:
          this.translateSnackBar.recipeName +
          '<input id="swal-upd-recipe" class="swal2-input">' +
          this.translateSnackBar.dieLiveQty + '<br>' +
          '<input id="swal-upd-die" type="number" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: this.translateSnackBar.save,
      cancelButtonText: this.translateSnackBar.close,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      preConfirm: function (recipe) {
        console.log('preConfirm', recipe);
        if(!document.getElementById('swal-recipe')['value'] || !document.getElementById('swal-die')['value']) {
          Swal.showValidationMessage('No data!');
        } else {
          return recipeName = document.getElementById('swal-recipe')['value'],
                 dieLiveQty = document.getElementById('swal-die')['value'];
        }
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      }
    }).then( (result)=> {
      if (result.isConfirmed) {
        this.blockUI.start('Loading...');
        let obj = {'recipeName' : recipeName, 'dieLiveQty' : dieLiveQty}
        this.recipeService.createRecipe(obj).subscribe(recipeService => {
          this.getRecipe();
          Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.saveMsg, showConfirmButton: false, timer: 2000 })
          this.blockUI.stop();
        },(error) => {
            Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.errorMsg, showConfirmButton: false, timer: 2000})
            this.blockUI.stop();
          }
        );
      }
    });
  }

  updateRecipe(row) {
    console.log('updateRecipe', row, this.translateSnackBar.fillMsg);
    Swal.fire({
      // title: this.translateSnackBar.recipeName,
      html: this.translateSnackBar.recipeName +
      '<input id="swal-upd-recipe" class="swal2-input" value="'+ row.recipeName +'">' +
      this.translateSnackBar.dieLiveQty + '<br>' +
      '<input id="swal-upd-die" type="number" class="swal2-input" value="'+ row.dieLiveQty +'">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: this.translateSnackBar.save,
      cancelButtonText: this.translateSnackBar.close,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      preConfirm: function (recipe) {
        if(!document.getElementById('swal-upd-recipe')['value'] || !document.getElementById('swal-upd-die')['value']) {
          Swal.showValidationMessage('No data!');
        } else {
          return row.recipeName = document.getElementById('swal-upd-recipe')['value'],
                 row.dieLiveQty = document.getElementById('swal-upd-die')['value'];
        }
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      }
    }).then( (result)=> {
      if (result.isConfirmed) {
        this.blockUI.start('Loading...');
        console.log('=====', )
        this.recipeService.updateRecipe(row).subscribe(recipeService => {
          this.getRecipe();
          Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.saveMsg, showConfirmButton: false, timer: 2000 })
          this.blockUI.stop();
        },(error) => {
          Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.errorMsg, showConfirmButton: false, timer: 2000})
          this.blockUI.stop();
        });
      }

    });
  }

  // -----------------------------------SUB RECIPE--------------

  toggleExpandRow(row, expanded) {
    console.log('Toggled Expand Row!', row, expanded);
    if (!expanded) {
      this.getSubRecipe(row);
    }
  }

  addResourceRow() {
    let emptyResourceRow = { // for new row Material Operation
      recipeId: this.currentRowSelected.id,
      step: null,
      kilograms: null,
      dieLiveQty: '',
      status: false
    };
    this.subRecipees.push(emptyResourceRow);
    this.subRecipees = [...this.subRecipees];
  }

  getSubRecipe(row) {
    console.log('createSubRecipe', row);
    this.blockUI.start('Loading...');
    this.currentRowSelected = row;
    this.recipeService.getSubRecipe(row.id).subscribe((data) => {
        this.subRecipees = data;
        this.blockUI.stop();
    }, error =>{
      this.blockUI.stop();
    });
  }

  operationSubRecipe(row, ind) {
    console.log('operationSubRecipe', row, ind);
    if(row.step && row.kilograms) {
      row.id ? this.updateSubRecipe(row, ind) : this.createSubRecipe(row, ind)
    } else {
      Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.fillAllRowsMsg, showConfirmButton: false, timer: 2000})
    }
  }

  createSubRecipe(row, ind) {
    console.log('createSubRecipe', row);
    this.blockUI.start('Loading...');
    this.recipeService.createSubRecipe(row).subscribe(recipeService => {
      this.getSubRecipe(this.currentRowSelected);
      Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.saveMsg, showConfirmButton: false, timer: 2000 })
      this.blockUI.stop();
      this.edit[ind] = false;
    },(error) => {
        Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.errorMsg, showConfirmButton: false, timer: 2000})
        this.blockUI.stop();
      }
    );
  }

  updateSubRecipe(row, ind) {
    console.log('updateSubRecipe', row, ind);
    this.blockUI.start('Loading...');
    this.recipeService.updateSubRecipe(row).subscribe(recipeService => {
      this.getSubRecipe(this.currentRowSelected);
      Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.saveMsg, showConfirmButton: false, timer: 2000 })
      this.blockUI.stop();
      this.edit[ind] = false;
    },(error) => {
        Swal.fire({ position: 'bottom-end', icon: 'warning', title: this.translateSnackBar.errorMsg, showConfirmButton: false, timer: 2000})
        this.blockUI.stop();
      }
    );
  }

  deleteSubRecipe(row, ind) {
    console.log('deleteSubRecipe', row);
    this.blockUI.start('Loading...');
    this.recipeService.deleteSubRecipe(row.id).subscribe(recipeService => {
      this.getSubRecipe(this.currentRowSelected);
      Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.deleteMsg, showConfirmButton: false, timer: 2000})
      this.blockUI.stop();
      this.edit[ind] = false;
    },(error) => {
        this.getSubRecipe(this.currentRowSelected);
        Swal.fire({ position: 'bottom-end', icon: 'success', title: this.translateSnackBar.deleteMsg, showConfirmButton: false, timer: 2000})
        this.blockUI.stop();
        this.edit[ind] = false;
      }
    );
  }
}
