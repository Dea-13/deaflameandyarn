import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '../../../../@core/services/config.service';
import { AuthenticationService } from '../../../../auth/service';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from '../../../../core/services';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginFormUser: FormGroup;
  public loginFormCard: FormGroup;
  public loading = false;
  public submittedUser = false;
  public submittedCard = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  public translateSnackBar: any;
  myIntervalCloseApp: any;

  // Private
  private _unsubscribeAll: Subject<any>;
  enableOtherForm: boolean = false;
  cart: any;
  cartLength: any;

  @ViewChild('myDivRed', { static: false }) myDivRed: ElementRef<HTMLElement>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private appLoginService: AuthenticationService,
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private toastrService: ToastrService,
    public translate: TranslateService,
    public electronService: ElectronService
  ) {
    this.translate.get('translate').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  closeTime(){
    if (this.electronService.isElectron) {
      this.myIntervalCloseApp = setInterval(() => {
        this.electronService.closeWindows()
      }, 600000);
    }
  }


  // convenience getter for easy access to form fields
  get f() {
    if(!this.enableOtherForm){
      return this.loginFormUser.controls;
    } else {
      return this.loginFormCard.controls;
    }
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  inputCart(ev) {
    this.cart = ev.target.value;
    this.cartLength = this.cart.length;
    console.log('inputCart: ', this.cart);
    if(this.cartLength >= 11 && this.cartLength <= 14){
      console.log('inputCart222: ', this.cart, this.cartLength);
      setTimeout(() => {
        this.onSubmit();
      }, 500);
    }
  }

  onSubmit() {
    let url;
    // stop here if form is invalid
    if(!this.enableOtherForm){
      this.submittedUser = true;
      if (this.loginFormUser.invalid) {
        return;
      } else {
        url = this.appLoginService.loginUser(this.loginFormUser.controls.email.value, this.loginFormUser.controls.password.value);
      }
    } else {
      this.submittedCard = true;
      if (this.loginFormCard.invalid) {
        return;
      } else {
        url = this.appLoginService.loginCard(this.loginFormCard.controls.card.value);
      }
    }

    url.subscribe(config => {
      // console.log('++++++++', JSON.parse(config.permissionGroup.jsonData).calendar.read);
      if (config) {
        localStorage.setItem('_currentUser', JSON.stringify(config));
        //redirect to home page
        setTimeout(() => {
          this._router.navigate(['/api/stated']);
        }, 100);
        // Login
        this.loading = true;
      }
    }, error => {
      console.log('error: ', error, error['status'], error['status'] == 401);
      if(error['status'] == 401){
        Swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: this.translateSnackBar.errorLogin ,
          showConfirmButton: false,
          timer: 2000
        })
        // Login
        this.loading = false;
      }
    });


  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginFormUser = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.loginFormCard = this._formBuilder.group({
      card: ['', [Validators.required]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

    // this.closeTime()
  }

  changeForm(value){
    console.log('changeForm', value);
    if(value == 1){
      this.enableOtherForm = true;
      setTimeout(() =>  this.triggerRedClick(), 5);
    } else {
      this.enableOtherForm = false;
    }
  }

  triggerRedClick() {
      let el: HTMLElement = this.myDivRed.nativeElement;
      el.focus()
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    clearInterval(this.myIntervalCloseApp);
    // Unsubscribe from all subscriptions
    // this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
